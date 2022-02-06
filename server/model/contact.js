const mongoose = require("mongoose");

//Define a schema for User
const contactSchema = new mongoose.Schema({
    name: { type: String, maxLength: 50 },
    phone: { type: String, required: true, maxlength: 15, unique: true },
    email: { type: String, unique: true, required: true },
    address: { type: String, maxLength: 50 },
    image: { data: Buffer, contentType: String },
    isFavourite: { type: Boolean, default: false }

})

//Export function to create "Contact" model class
module.exports = mongoose.model("Contact", contactSchema)