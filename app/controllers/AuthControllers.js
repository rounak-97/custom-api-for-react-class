const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

class AuthControllers {
  // Register user
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Create user (password hashing handled in model)
      const user = await User.create({ name, email, password });

      return res.status(201).json({
        message: 'User registered successfully',
        userId: user._id,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }

  // Profle retrieval
  static async profile(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'Profile fetched successfully',
        user
      });

    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch profile',
        error: error.message
      });
    }
  }
}

module.exports = AuthControllers;