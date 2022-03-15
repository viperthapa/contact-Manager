import Contact from "../../models/contact";
import mongoose from "mongoose";

/**
 * Find all contacts
 * @function list
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function list(user) {
  try {
    const contactList = await Contact.find({ userid: user }).sort({
      isFavourite: -1,
      name: 1,
    });
    return contactList;
  } catch (error) {
    throw new Error("No data available");
  }
}

/**
 * find detail of contact
 * @function detail
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function detail(contactId) {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error("No data available");
  }
}

/**
 * create a contact
 * @function create
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function create(data) {
  const newContact = new Contact(data);
  try {
    return await newContact.save();
  } catch (error) {
    throw error;
  }
}

/**
 * update a contact
 * @function update
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function update(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
}

/**
 * destroy a contact
 * @function destroy
 * @param {*}  req
 * @param {*} res
 * @return
 */
export async function destroy(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId))
    return res.status(404).send(`No contact with id: ${id}`);
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
}
