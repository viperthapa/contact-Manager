/*
find:display the particular data from db that it matches
findId: used to find a single document by its _id field.
update: used to update one document in the database without returning it.
*/
const Contact = require("../models/contact")
const path = require('path');
var mongoose = require('mongoose');
const auth = require("../middleware/user");
const ContactService = require("../services/contact/contactService");
const validateCreateContact = require("../validations/contact/CreateContact");
const validateUpdateContact = require("../validations/contact/UpdateContact");


/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
*/
exports.all = async function (req, res) {
    try {
        const contacts = await ContactService.list(req.user.id);
        res.status(200).json(contacts)
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
*/
exports.show = async function (req, res, next) {
    try {
        const { id } = req.params
        const contactDetail = await ContactService.detail(id);
        res.status(200).json(contactDetail);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



/**
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns
*/
exports.create = async function (req, res, next) {
    try{

        const checkValidate = validateCreateContact(req.body)
        if (Object.keys(checkValidate).length!==0){
            res.status(400).send({ status: 400, error:checkValidate  })}
        req.body.userid = req.user.id
        const contactCreate = await ContactService.create(req.body)
        console.log("contact create**",contactCreate)
        return res.status(201).json({ data: contactCreate });

    } catch(err){
        throw err
    }
}


/**
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns
*/
exports.update = async function (req, res, next) {
    const checkValidate = validateUpdateContact(req.body)
    if (Object.keys(checkValidate).length!==0){
        res.status(400).send({ status: 400, error:checkValidate  })}
    const contact = await ContactService.update(req.params.id, req.body)
    return res.status(200).send({ status: 200, data: contact, message: "contact updated Successfully" });
}

exports.delete = async function(req,res,next){
    console.log("enter unto delet",req.params.id)
    const contact = await ContactService.destroy(req.params.id);
    return res.status(200).send({ status: 200,message: "contact deleted Successfully" });
}


