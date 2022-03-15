import jwt from "jsonwebtoken";
import config from "../config/auth";

/**
 * Function to verify the token.
 * @function verifyToken
 * @param {*}  req
 * @param {*} res
 * @return
 */
async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token == null)
    return res
      .status(403)
      .send({ error: "A token is required for authentication" });
  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
export default verifyToken;
