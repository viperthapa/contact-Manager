//kept in separate as its token is required in different function
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

//function to verify bearer token 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    //check if auth header exist
    const token = bearerHeader && bearerHeader.split(' ')[1];
    if (token == null) return res.status(403).send({ error: "A token is required for authentication" });
    jwt.verify(token, config.secret, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
      })
}
module.exports = verifyToken;