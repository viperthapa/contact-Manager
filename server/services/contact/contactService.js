const Contact = require("../../models/contact")
var mongoose = require('mongoose');


/**
 * Find all contacts.
 *
 * @returns {Promise}
*/
exports.list = async function(user){
    console.log("user",user)
    try{
        const contactList = await Contact.find({userid:user}
            ).sort({ isFavourite:-1 , name: 1});
        return contactList
    }catch(error){
        throw new Error('No data available');
    }
}

/**
 * Find single detail contact.
 *
 * @returns {Promise}
*/
exports.detail = async function(contactId){
    try{
        return await Contact.findById(contactId);
    }catch(error){
        throw new Error('No data available');
    }
}

/**
 * Store an contact of auth user.
 *
 * @returns {Promise}
*/
exports.create = async function(data){
    // validate
    const newContact = new Contact(data);
    try {
        console.log("succesfuly created")
      return await newContact.save();
    } catch (error) {
        console.log("error",error)
        res.status(409).json({ message: error.message });
    }
}

/**
 * update an contact of auth user.
 *
 * @returns {Promise}
*/
exports.update = async function(id,data){
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const result = await Contact.findByIdAndUpdate(id, data, { new: true });
    return result;
}

/**
 * delete an contact 
 *
 * @returns {Promise}
*/
exports.destroy = async function(contactId){
    if (!mongoose.Types.ObjectId.isValid(contactId)) return res.status(404).send(`No contact with id: ${id}`);
    const result = await Contact.findByIdAndRemove(contactId);
    return result;
}