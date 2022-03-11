
require('dotenv').config()
const auth = require("../middleware/user");
const validateRegisterUser = require("../validations/auth/createAuth")
const validateLoginUser = require("../validations/auth/requestAuth")
const userServices = require("../services/auth/createAuth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const RefreshToken = require("../models/RefreshToken")
const config = require("../config/auth");
const { refreshToken } = require('firebase-admin/app');



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
    if (Object.keys(validatedData).length!==0)
    return res.status(400).send({ status: 400, err: validatedData });

    //check if the email already exist in db
    const checkEmail = await userServices.isValid(req.body.email)
    if (checkEmail) {
        res.status(409).send({"message":"User with this email already exist!"})
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
    //validation using joi 
    const validatedData = validateLoginUser(req.body);
    if (Object.keys(validatedData).length!==0)
    return res.status(400).send({ status: 400, err: validatedData });


    //check if the user is already in db 
    const user = await userServices.isValid(req.body.email)
    if (!user){
        return res.status(404).send({ message: "User Not found!" });
    }  
    //check if the provided password same as a db password
    var passwordIsValid =await bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
    }
    const access_token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.jwtExpiration });
    let refreshToken = await RefreshToken.createToken(user);


    // const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN)

    res.status(200).send({
        id: user._id,
        full_name:user.name,
        username: user.username,
        email: user.email,
        access_token: access_token,
        refresh_token:refreshToken
    });

};

/** user login
*
* @param {RefreshToken}  req
* @param {status,message} res
* @returns
*/
exports.refreshToken = async (req,res) => {
    const requestToken = req.body.refresh_token;
    //check if token is empty
    if (requestToken == null){
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try{
        //get the refresh token
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken){
            return res.status(401).json({ message: "Token not in db!" });
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            
            res.status(401).json({
              message: "Refresh token was expired. Please make a new sign in request",
            });
            return;
          }
      
        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
        });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
          });


    }catch(err){
        return res.status(500).send({ message: err });
    }


}


/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
*/
exports.all = async function (req, res) {
    try {
        const user = await userServices.list();
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}