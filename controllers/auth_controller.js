// controllers/auth_controller.js

import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';

// Helper function to generate a JWT token
const generateToken = (id) => {
  // IMPORTANT: Using JWT_PRIVATE_KEY as per your .env configuration
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, { // <--- CHANGED HERE
    expiresIn: '1h', // Token valid for 1 hour
  });
};

/**
 * @desc Authenticate user & get token (Login)
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(401).json({ message: 'Invalid mobile or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid mobile or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      token: token,
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};