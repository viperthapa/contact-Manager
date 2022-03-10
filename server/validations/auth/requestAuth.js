const Joi = require('joi');

const authDataSchema = Joi.object({
    email:Joi.string().min(5).max(200).required().messages({
        "string.empty":"This field is required",
        "string.max":
        "length must be less than or equal to {{#limit}} characters long",
        "string.min":
        "length must be at least {{#limit}} characters long",
    }),
    password: Joi.string().required().messages({
        "string.empty":"This field is required",
    }),

}).options({ abortEarly: false });



function validateLoginUser(data) {
    const result = authDataSchema.validate(data);
    let mapError = {};
    if (result.error) {
      Object.keys(result.error.details).map(function (key, index) {
        let keyName = result.error.details[key].context.key;
        return (mapError[keyName] = result.error.details[key].message);
      });
    }
    return mapError;
  }
  

module.exports = validateLoginUser;
  