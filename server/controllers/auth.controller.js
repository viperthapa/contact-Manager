import "dotenv/config";
import validateUser from "../validations/auth";
import * as userService from "../service/auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";
import config from "../config/auth";
import * as response from "../helpers/response";

/**
 * Create a new user.
 * @param {string} name -name of user
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @returns {object}
 */
export async function register(req, res) {
  const validatedData = await validateUser.ValidateUserRegister(req.body);
  if (validatedData.error) {
    return res.status(400).json(validatedData.error);
  }
  const checkEmail = await userService.checkEmail(req.body.email);
  if (checkEmail) {
    return response.failure(res, 409, "Email already exist");
  }
  try {
    const createUser = await userService.create(req.body);
    return response.success(res, 201, createUser);
  } catch (err) {
    return err;
  }
}

/**
 * Create a new user.
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @returns {string} - token
 */
export async function login(req, res) {
  try {
    const validatedData = await validateUser.validateUserLogin(req.body);
    if (validatedData.error) {
      return res.status(400).json(validatedData.error);
    }
  } catch (err) {
    return err;
  }

  const user = await userService.checkEmail(req.body.email);
  if (!user) {
    return res.status(404).send({ message: "User Not found!" });
  }
  const passwordIsValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  const access_token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.jwtExpiration,
  });
  let refreshToken = await RefreshToken.createToken(user);

  res.status(200).send({
    id: user._id,
    full_name: user.name,
    username: user.username,
    email: user.email,
    access_token: access_token,
    refresh_token: refreshToken,
  });
}

/** Get a new access token
 * @param {*}  req
 * @param {*} res
 * @returns {Promise<string>} token
 */
export async function refreshToken(req, res) {
  const requestToken = req.body.refresh_token;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      return res.status(401).json({ message: "Token not in db!" });
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(401).json({
        message: "Refresh token was expired. Please make a new sign in request",
      });
      return;
    }

    let newAccessToken = jwt.sign(
      { id: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

/**
 * Get all Users
 * @param {*} req
 * @param {*} res
 * @returns {Array}
 */
export async function all(req, res) {
  try {
    const user = await userService.list();
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
