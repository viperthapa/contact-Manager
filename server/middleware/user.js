//kept in separate as its token is required in different function
const jwt = require("jsonwebtoken");

const config = process.env;

//function to verify bearer token 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.status(403).send({ error: "A token is required for authentication" });
    }
}
module.exports = verifyToken;



// const verifyToken = (req, res, next) => {
//     console.log("verify token", req.body.token)
//     const token =
//         req.body.token || req.query.token || req.headers["x-access-token"];

//     if (!token) {
//         return res.status(403).send({ error: "A token is required for authentication" });
//     }
//     try {
//         const decoded = jwt.verify(token, config.TOKEN_KEY);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).send({ error: "Invalid Token" });
//     }
//     return next();
// };