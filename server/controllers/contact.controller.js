import "dotenv/config";
import * as contactServices from "../service/contact.service";
import ValidateContact from "../validations/contact";

/**
 * Get all contacts.
 *
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 */
export async function all(req, res) {
  const contacts = await contactServices.list(req.user.id);
  res.status(200).json(contacts);
}

/**
 * GET a contact by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function show(req, res) {
  try {
    const { id } = req.params;
    const contactDetail = await contactServices.detail(id);
    res.status(200).json(contactDetail);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * Create a new contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res) {
  try {
    const validatedData = await ValidateContact.ValidateContactDetails(
      req.body
    );
    if (validatedData.error) {
      return res.status(400).json(validatedData.error);
    }
    req.body.userid = req.user.id;
    const contactCreate = await contactServices.create(req.body);
    return res.status(201).json({ data: contactCreate });
  } catch (err) {
    throw err;
  }
}

/**
 * update a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function update(req, res) {
  const validatedData = await ValidateContact.ValidateContactDetails(req.body);
  if (validatedData.error) {
    return res.status(400).json(validatedData.error);
  }
  const contact = await contactServices.update(req.params.id, req.body);
  return res.status(200).send({
    status: 200,
    data: contact,
    message: "contact updated Successfully",
  });
}

/**
 * DELETE a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function remove(req, res) {
  const contact = await contactServices.destroy(req.params.id);
  return res
    .status(200)
    .send({ status: 200, message: "contact deleted Successfully" });
}
