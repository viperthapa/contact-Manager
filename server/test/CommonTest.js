process.env.NODE_ENV = "test"
process.env.API_BASE = "/api"

const BASE_URL = "localhost:5000/api/"

const request = require("supertest")("express");
const chai = require("chai");
const should = chai.should();
const User = require("../models/user")


const defaultUSer = {'name':'test','email':'test@gmail.com','password':'shrestha'}

//creating a new user
const createUser = async () => {
    const userModel = new User(defaultUSer);
    await userModel.save();
}

const getDefaultUser = async () => {
    let user = await User.find({'email':defaultUSer.email});
    if (user.length === 0){
        await createUser();
        return getDefaultUser();
    }
    else{
        return user[0]
    }
}

const loginWithDefaultUser = async () => {
    let user = await getDefaultUser
    const res = request.post(BASE_URL+"login").send({'email':user.email,'password':user.password}).expect(200)
    return res;
}

const cleanExceptDefaultUser = async () => {
    let user = await getDefaultUser();
    await User.deleteMany({ "email": {$ne: user.email}});    
}

module.exports = {
    loginWithDefaultUser: loginWithDefaultUser,
    cleanExceptDefaultUser: cleanExceptDefaultUser
}; 



