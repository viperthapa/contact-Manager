import "dotenv/config";
import * as contactServices from "../services/contact/contactService";
import validateCreateContact from "../validations/contact/CreateContact";
import validateUpdateContact from "../validations/contact/UpdateContact";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
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
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
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
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function create(req, res) {
  try {
    const validatedData = validateCreateContact(req.body);
    if (Object.keys(validatedData).length !== 0)
      return res.status(400).send({ message: validatedData });

    req.body.userid = req.user.id;
    const contactCreate = await contactServices.create(req.body);
    return res.status(201).json({ data: contactCreate });
  } catch (err) {
    throw err;
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function update(req, res) {
  const checkValidate = validateUpdateContact(req.body);
  if (Object.keys(checkValidate).length !== 0)
    return res.status(400).send({ status: 400, err: checkValidate });
  const contact = await contactServices.update(req.params.id, req.body);
  return res.status(200).send({
    status: 200,
    data: contact,
    message: "contact updated Successfully",
  });
}

export async function remove(req, res) {
  const contact = await contactServices.destroy(req.params.id);
  return res
    .status(200)
    .send({ status: 200, message: "contact deleted Successfully" });
}
