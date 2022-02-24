const Contact = require("../model/contact")
const fs = require('fs');
var mongoose = require('mongoose');
const auth = require("../middleware/user")

//get all the contacts
// exports.list = async function (req, res, next) {
//     try {
//         const contacts = await Contact.find();
//         res.status(200).json(contacts)
//     } catch (err) {
//         next(err);
//     }
// }

// exports.create = async function(req,res){

// }

