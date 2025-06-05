import User from "../models/user_model.js";

export const createUser = async (req, res) => {
  try {
    // CRITICAL FIX: Destructure 'password' from req.body
    const { name, mobile, gender, email, password } = req.body; 
    const ghanaCardImage = req.file?.path;

    if (!ghanaCardImage) {
      return res.status(400).json({ message: 'Ghana Card image is required' });
    }
    // ADDED: Explicit check for password if not caught by schema validation message
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Pass the 'password' to the User model constructor
    const user = new User({ name, mobile, gender, email, password, ghanaCardImage }); 
    await user.save();

    // SECURITY BEST PRACTICE: Do not return the hashed password in the response
    const userResponse = user.toObject(); // Convert Mongoose document to a plain JavaScript object
    delete userResponse.password; // Remove the password field from the object

    res.status(201).json({ message: 'User created', user: userResponse });
  } catch (error) {
    // Improved error handling for duplicate mobile number
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mobile) {
      return res.status(409).json({ message: 'Mobile number already exists. Please use a different one.' });
    }
    console.error("Error creating user:", error); // Log the full error for better debugging
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) updates.ghanaCardImage = req.file.path;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
