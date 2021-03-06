import Joi from "joi";

//validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "This field is required",
    "string.pattern.base": "only allows alphabet i.e. a-Z",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min": "length must be at least {{#limit}} characters long",
  }),
  email: Joi.string().min(5).max(200).required().lowercase().messages({
    "string.empty": "This field is required",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min": "length must be at least {{#limit}} characters long",
  }),
  password: Joi.string().required().messages({
    "string.empty": "This field is required",
  }),
});

/**
 * Validate login user request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const loginSchema = Joi.object({
  email: Joi.string().min(5).max(200).required().messages({
    "string.empty": "This field is required",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min": "length must be at least {{#limit}} characters long",
  }),
  password: Joi.string().required().messages({
    "string.empty": "This field is required",
  }),
}).options({ abortEarly: false });

async function ValidateUserRegister(object) {
  try {
    const joiRes = registerSchema.validate(object, { abortEarly: false });
    return joiRes;
  } catch {
    throw new Error(error);
  }
}

/**
 * Validate register user request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function validateUserLogin(object) {
  try {
    const joiRes = loginSchema.validate(object, {
      abortEarly: false,
    });
    return joiRes;
  } catch {
    throw new Error(error);
  }
}

export default {
  ValidateUserRegister,
  validateUserLogin,
};
