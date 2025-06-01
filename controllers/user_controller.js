import User from "../models/user_model.js";

export const createUser = async (req, res) => {
  try {
    const { name, mobile, gender, email } = req.body;
    const ghanaCardImage = req.file?.path;

    if (!ghanaCardImage) return res.status(400).json({ message: 'Ghana Card image is required' });

    const user = new User({ name, mobile, gender, email, ghanaCardImage });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
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
