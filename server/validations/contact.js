import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(5).max(50).required().messages({
    "string.empty": "This field is required",
    "string.pattern.base": "only allows alphabet i.e. a-Z",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min": "length must be at least {{#limit}} characters long",
  }),
  email: Joi.string().min(5).max(200).required().messages({
    "string.empty": "This field is required",
    "string.max":
      "length must be less than or equal to {{#limit}} characters long",
    "string.min": "length must be at least {{#limit}} characters long",
  }),
  phone: Joi.array()
    .items(
      Joi.object({
        home: Joi.string().min(7).max(10).pattern(/^\d+$/),
        mobile: Joi.string().min(7).max(10).pattern(/^\d+$/),
        work: Joi.string().min(7).max(10).pattern(/^\d+$/),
      }).min(1)
    )
    .required()
    .messages({
      "string.empty": "the field is required",
      "object.min": "At least 1 Phone number needs to be present",
      "string.pattern.base": "only allows numeric i.e. 0-9",
      "string.max":
        "length must be less than or equal to {{#limit}} characters long",
      "string.min": "length must be at least {{#limit}} characters long",
    }),
  isFavourite: Joi.boolean(),
  profile: Joi.string()
    .required()
    .messages({ "string.empty": "the field is required" }),
  address: Joi.string()
    .allow(null, "")
    .max(100)
    .pattern(/^[a-zA-Z ,0-9]*$/, "string")
    .trim()
    .messages({
      "string.empty": "the field is required",
      "string.pattern.base": "only allows alphanumber i.e. a-Z, 0-9 and commas",
    }),
}).options({ abortEarly: false });

/**
 * Validate contact create/update request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function ValidateContactDetails(object) {
  try {
    const joiRes = contactSchema.validate(object, { abortEarly: false });
    return joiRes;
  } catch {
    throw new Error(error);
  }
}

export default {
  ValidateContactDetails,
};
