
//reference code for model :https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const mongoose = require("mongoose");

//Define a schema for User
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
})

//Export function to create "User" model class
module.exports = mongoose.model("User", userSchema)