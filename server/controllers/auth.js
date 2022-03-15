import "dotenv/config";
import validateRegisterUser from "../validations/auth/createAuth";
import validateLoginUser from "../validations/auth/requestAuth";
import * as userServices from "../services/auth/createAuth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";
import config from "../config/auth";

/**
 * Register the users.
 * @function register
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function register(req, res) {
  const validatedData = validateRegisterUser(req.body);
  if (Object.keys(validatedData).length !== 0)
    return res.status(400).send({ status: 400, err: validatedData });
  const checkEmail = await userServices.checkEmail(req.body.email);
  if (checkEmail) {
    return res
      .status(409)
      .json({ message: "User with this email already exist!" });
  }
  try {
    const createUser = await userServices.create(req.body);
    res.status(201).json(createUser);
  } catch (err) {
    console.log(err);
  }
}

/** user login
 * @function login
 * @param {email,password}  req
 * @param {status,message} res
 * @returns
 */
export async function login(req, res) {
  const validatedData = validateLoginUser(req.body);
  if (Object.keys(validatedData).length !== 0)
    return res.status(400).send({ status: 400, err: validatedData });

  const user = await userServices.checkEmail(req.body.email);
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

/** user login through refresh token
 * @function refreshToken
 * @param {RefreshToken}  req
 * @param {status,message} res
 * @returns
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
 * get all users
 * @function refreshToken
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function all(req, res) {
  try {
    const user = await userServices.list();
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
