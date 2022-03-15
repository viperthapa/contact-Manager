import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userid: { type: Object },
  name: { type: String, maxLength: 50, required: true, trim: true },
  phone: {
    type: Array,
    validate: (value) => Array.isArray(value) && Array.length >= 0,
  },
  email: { type: String, required: true, trim: true },
  address: { type: String, maxLength: 50, trim: true },
  profile: { type: String, required: true, minlength: 5, trim: true },
  isFavourite: { type: Boolean, default: false, trim: true },
  created_at: { type: Date },
  updated_at: { type: Date },
});
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
