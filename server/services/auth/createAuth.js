const User = require("../../models/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()


//check if email already exists
exports.isValid = async function(email){
    try{
        const user =  await User.findOne({ email:email });
        return user
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
        newUser.save()
        return newUser;

    }
    catch (err) {
        console.log(err);
    }
}


/**
 * Find all users.
 *
 * @returns {Promise}
*/
exports.list = async function(user){
    try{
        return await User.find();
    }catch(error){
        throw new Error('No data available');
    }
}
