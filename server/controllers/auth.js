
require('dotenv').config()
const auth = require("../middleware/user");
const validateRegisterUser = require("../validations/auth/createAuth")
const validateLoginUser = require("../validations/auth/requestAuth")
const userServices = require("../services/auth/createAuth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

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
        console.log("user created successfully",createUser)
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
    const access_token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '20s' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN)


    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        access_token: access_token,
        refreshToken:refreshToken
    });

};

exports.token = async function(req,res){
    const refreshToken = req.body.token
    console.log("refreshToken",refreshToken)
    //check if token is null
    if (refreshToken == null) return res.sendStatus(401).send({ message: "Invalid token!" });
    //find user
    const user =  await User.findOne({ refresh_token:refreshToken });
    console.log("user",user)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '20s' });
        res.json({ accessToken: accessToken })
      })
}
