const User = require("../../models/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()


//check if email already exists
exports.isValid = async function(email){
    try{
        return await User.findOne({ email:email });
    }
    catch(error){
        throw new Error("User is not valid")
    }
}

//create the user
exports.create = async function(data){
    try{
        //encrypt the password that user provided using plain text
        encryptedPassword = await bcrypt.hash(data.password, 10);
        const newUser = User({
            name:data.name,
            email:data.email,
            password:encryptedPassword
        })
        // Create token
        const token = jwt.sign(
            { user_id: newUser._id, email:newUser.email,name:newUser.name },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = jwt.sign({ user_id: newUser._id }, process.env.REFRESH_TOKEN)

        // save user token
        newUser.token = token;
        newUser.refresh_token = refreshToken;
        newUser.save()
        return newUser;

    }
    catch (err) {
        console.log(err);
    }
}

