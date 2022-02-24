
const auth = require("../middleware/user");
const config = require("../config/config");
const validateRegisterUser = require("../validations/auth/createAuth")
const validateLoginUser = require("../validations/auth/requestAuth")
const userServices = require("../services/auth/createAuth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Register the users.
 *
 * @param {email,name,password}  req
 * @param {status,message} res
 * @returns
*/
exports.register = async function (req, res) {

    //validation using joi 
    const validatedData = validateRegisterUser(req.body);
    //check if the email already exist in db
    const checkEmail = await userServices.isValid(req.body.email)
    if (checkEmail) {
        res.status(409).send("User with this email already exist!")
    }

    try {
        const createUser = await userServices.create(req.body)
        res.status(201).json(createUser);
    } catch (err) {
        console.log(err);
    }
}


/** user login
*
* @param {email,password}  req
* @param {status,message} res
* @returns
*/
exports.login  = async function(req,res) {
    console.log("res body",req.body)
    console.log("res passowrd",req.body.password)

    //validation using joi 
    const validatedData = validateLoginUser(req.body);

    //check if the user is already in db 
    const user = await userServices.isValid(req.body.email)
    if (!user){
        return res.status(404).send({ message: "User Not found!" });
    }  
    console.log("logged in user",user.password)
    //check if the provided password same as a db password
    var passwordIsValid =await bcrypt.compareSync(
        req.body.password,
        user.password
    );
    console.log("passwordIsValid",passwordIsValid)

    if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.tokenLife });
    const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })

    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        refreshToken: refreshToken
    });

};

