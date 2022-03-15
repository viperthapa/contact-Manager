import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 40,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  created_at: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

export default User;
