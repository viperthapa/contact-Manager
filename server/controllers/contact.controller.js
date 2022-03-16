import "dotenv/config";
import * as contactServices from "../service/contact.service";
import ValidateContact from "../validations/contact";

/**
 * GET api/contacts/
 * @summary Get all contacts
 * @param {*} req
 * @param {*} res
 * @returns {Array}
 */
export async function all(req, res) {
  try {
    const contacts = await contactServices.list(req.user.id);
    res.status(200).json(contacts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

/**
 * GET api/contacts/<id>
 * @summary get a single contact
 * @param {*} req
 * @param {*} res
 * @returns {promise<any>}
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
 * POST api/contacts/
 * @summary create a contact
 * @param {*} req
 * @param {*} res
 * @returns {promise<any>}
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
 * PUT api/contacts/<id>
 * @summary update a contact
 * @param {*} req
 * @param {*} res
 * @returns {promise<any>}
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
 * DELETE api/contacts/<id>
 * @summary delete a contact
 * @param {*} req
 * @param {*} res
 * @returns {promise<any>}
 */
export async function remove(req, res) {
  const contact = await contactServices.destroy(req.params.id);
  return res
    .status(200)
    .send({ status: 200, message: "contact deleted Successfully" });
}
