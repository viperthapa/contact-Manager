const User = require("../../model/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
//check if email already exists
async function isValid(email){
    try{
        return await User.findOne({ email });
    }
    catch(error){
        throw new Error("User is not valid")
    }
}

//create the user
async function create(data){
    try{
        //encrypt the password that user provided using plain text
        console.log("brycpt",data.password)
        encryptedPassword = await bcrypt.hash(data.password, 10);
        console.log("encryptedPassword",encryptedPassword)
        const newUser = await User.create({
            name:data.name,
            email:data.email,
            password:encryptedPassword
        })
        // Create token
        const token = jwt.sign(
            { user_id: newUser._id, email:newUser.email,name:newUser.name },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        // save user token
        newUser.token = token;
        return newUser;

    }
    catch (err) {
        console.log(err);
    }
}

module.exports={
    isValid:isValid,
    create:create,


};
