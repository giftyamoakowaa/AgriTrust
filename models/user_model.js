import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,

  },
  password: { 
    type: String,
    required: true,
    minlength: 6 // Enforce a minimum password length for security
  },
  ghanaCardImage: {
    type: String,
    required: true
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
 if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
});
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;