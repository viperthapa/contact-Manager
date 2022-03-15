import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/user";

/**
 * Check the presence of  email in system
 * @param {*}
 * @returns {string} - email
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
 * Save the user details.
 * @param {*}  req
 * @param {*} res
 * @returns {token} - token
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
    return err;
  }
}

/**
 * find all users
 * @param {*} req
 * @param {*} res
 * @returns {Array} -list of users
 */
export async function list(user) {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("No data available");
  }
}
