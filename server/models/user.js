
//reference code for model :https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const mongoose = require("mongoose");

//Define a schema for User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40,
      },
    email: { type: String, unique: true,required:true },
    password: { type: String },
    token: { type: String },
    refresh_token: { type: String },
    created_at: { type: Date, default: Date.now },

})

//Export function to create "User" model class
module.exports = mongoose.model("User", userSchema)