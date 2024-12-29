const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = (req, res) => {
  const { email, password, name } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    User.create(email, hashedPassword, name, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }

      const token = jwt.sign({ userId }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(201).json({ message: 'User created successfully', token });
    });
  });
};

// Login controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};