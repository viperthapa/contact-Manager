const Joi = require('joi');

function validateRegisterUser(user){
    const authDataSchema = Joi.object({
        name:Joi.string().min(3).max(30).required().messages({
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
        password: Joi.string().min(5).max(200).required().messages({
            "string.empty":"This field is required",
            "string.max":
            "length must be less than or equal to {{#limit}} characters long",
            "string.min":
            "length must be at least {{#limit}} characters long",
        }),

    }).options({ abortEarly: false });
    return authDataSchema.validate(user)
}

module.exports = validateRegisterUser;
  