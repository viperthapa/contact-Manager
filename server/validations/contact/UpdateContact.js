const Joi = require('joi');

function validateUpdateContact(contact){
    const contactDataSchema = Joi.object({
        // user_id:Joi.required(),
        name:Joi.string().min(5).max(50).required().messages({
            "string.empty":"This field is required",
            "string.pattern.base": "only allows alphabet i.e. a-Z",
            "string.max":
            "length must be less than or equal to {{#limit}} characters long",
            "string.min":
            "length must be at least {{#limit}} characters long",
        }),
        email:Joi.string().min(5).max(200).required().messages({
            "string.empty":"This field is required",
            "string.max":
            "length must be less than or equal to {{#limit}} characters long",
            "string.min":
            "length must be at least {{#limit}} characters long",
        }),
        phone:Joi.number().min(5).required().messages({
            "string.empty":"This field is required",
            "string.max":
            "length must be less than or equal to {{#limit}} characters long",
            "string.min":
            "length must be at least {{#limit}} characters long",
        }),
        isFavourite: Joi.boolean(),
        // image: Joi.string().messages({"string.empty":"the field is required"}),
        address: Joi.string()
        .allow(null, '')
            .max(100)
            .pattern(/^[a-zA-Z ,0-9]*$/, "string")
            .trim()
            .messages({
            "string.empty":"the field is required",
            "string.pattern.base": "only allows alphanumber i.e. a-Z, 0-9 and commas",
            }),
        

    }).options({ abortEarly: false });
    return contactDataSchema.validate(contact)
}

module.exports = validateUpdateContact;
  