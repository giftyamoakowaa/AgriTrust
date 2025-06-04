// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   gender: { type: String, required: true, enum: ['Male', 'Female'] },
//   email: { type: String },
//   ghanaCardImage: { type: String, required: true }, // store image path
// }, { timestamps: true });




// const User = mongoose.model("User", userSchema);
// export default User;


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
    unique: true, // Mobile number should be unique for login/registration
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
    // Optional: add a validation for email format if needed
  },
  password: { // <-- NEW FIELD: This is where the hashed password will be stored
    type: String,
    required: true,
    minlength: 6 // Enforce a minimum password length for security
  },
  ghanaCardImage: {
    type: String,
    required: true
  },
}, { timestamps: true });

// --- NEW: Middleware to hash password before saving (e.g., during sign-up) ---
userSchema.pre('save', async function(next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt (random string) to add to the password for unique hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Move to the next middleware or save operation
});

// --- NEW: Method to compare entered password with the hashed password (for login) ---
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Use bcrypt.compare to check if the plain text enteredPassword matches the stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;