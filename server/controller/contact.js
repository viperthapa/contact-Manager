/*
find:display the particular data from db that it matches
findId: used to find a single document by its _id field.
update: used to update one document in the database without returning it.
*/
const Contact = require("../model/contact")
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
const auth = require("../middleware/user")


//get all the contacts
exports.contacts = async function (req, res, next) {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts)
    } catch (err) {
        next(err);
    }
}

//get single contacts
exports.show = async function (req, res, next) {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//create contacts
exports.create = async function (req, res, next) {
    const { phone, email } = req.body;

    //Validate the phone number
    const oldPhone = await Contact.findOne({ phone });
    if (oldPhone) {
        res.status(409).send({ message: "User with this phone already exist!" })
    }
    console.log("entered in to services")
    //check email already exist 
    const oldEmail = await Contact.findOne({ email });
    if (oldEmail) {
        res.status(409).send({ message: "User with this email already exist!" })
    }
    console.log("entered in to services2")

    console.log("req body", req.body)
    const newContact = new Contact({ name: req.body.name, phone: req.body.phone, email: req.body.email, address: req.body.address })

    try {
        // newContact.img.data = fs.readFileSync(path.join(process.cwd() + '/' + req.file.path));
        // newContact.img.contentType = 'image/png'
        await newContact.save();

        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

    // var obj = {
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     address: req.body.address,
    //     img: {
    //         data: fs.readFileSync(path.join(process.cwd() + '/' + req.file.path)),
    //         contentType: 'image/png'
    //     }
    // }
    // // console.log("executed", obj._id)
    // Contact.create(obj, (err, item) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.status(201).json(obj);
    //     }
    // });

}

//update contacts
exports.update = async function (req, res, next) {
    try {
        const { id } = req.params
        const { name, phone, email, address, img, isFavourite } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedContact = { name, phone, email, address, img, isFavourite: Boolean(isFavourite), _id: id };
        await Contact.findByIdAndUpdate(id, updatedContact, { new: true });
        res.json(updatedContact);
    } catch (err) {
        next(err);
    }
}

//delete contacts
exports.delete = async function (req, res, next) {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await Contact.findByIdAndRemove(id);
        res.json({ message: "contact deleted successfully." });
    } catch (err) {
        next(err);
    }
}

//

// if (files.photo) {
//     if (files.photo.size > 300000) {
//      return res.status(400).json({
//       error: "Image Size should less then 2mb",
//     product.photo.data = fs.readFileSync(files.photo.path);
//     product.photo.contentType = files.photo.type;    