const mongoose = require("mongoose");

//Define a schema for User
const contactSchema = new mongoose.Schema({
    user_id:{type:Object,required:true},
    name: { type: String, maxLength: 50,required:true,trim: true },
    phone: { type: String, required: true, maxlength: 15, unique: true,trim: true },
    email: { type: String, unique: true, required: true,trim: true },
    address: { type: String, maxLength: 50,trim: true },
    image: { data: Buffer, contentType: String },
    isFavourite: { type: Boolean, default: false,trim: true },
    created_at:{type:Date},
    updated_at:{type:Date}

})

//Export function to create "Contact" model class
module.exports = mongoose.model("Contact", contactSchema)