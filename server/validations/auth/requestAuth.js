const Joi = require('joi');

function validateLoginUser(user){
    const authDataSchema = Joi.object({
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

module.exports = validateLoginUser;
  