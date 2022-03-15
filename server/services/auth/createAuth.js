import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../../models/user";

/**
 * To check if the email is already present or not in a system.
 * @function checkEmail
 * @param {string} email
 */
export async function checkEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}

/**
 * encrypt the user password.
 * @function register
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function create(data) {
  try {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const newUser = User({
      name: data.name,
      email: data.email,
      password: encryptedPassword,
    });
    newUser.save();
    return newUser;
  } catch (err) {
    console.log(err);
  }
}

/**
 * find all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function list(user) {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("No data available");
  }
}
