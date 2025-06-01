import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  email: { type: String },
  ghanaCardImage: { type: String, required: true }, // store image path
}, { timestamps: true });




const User = mongoose.model("User", userSchema);
export default User;
