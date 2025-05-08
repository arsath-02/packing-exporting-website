const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

//register
router.post('/register', async (req, res) => {
  try {
    const {name,phone, email, password, role, department } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required.' });
    }

    if (role === 'supervisor' && !department) {
      return res.status(400).json({ message: 'Department is required for supervisors.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({name,phone, email, password: hashedPassword, role, department });
    await user.save();

    res.status(201).json({ statuscode: 200, message: 'User registered successfully.', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, role, department } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    if (user.role !== role) {
      console.log("role mismatch");
      return res.status(403).json({ message: 'Role mismatch.' });
    }

    if (role === 'supervisor' && user.department !== department) {
      console.log("department mismatch");
      return res.status(403).json({ message: 'Department mismatch for supervisor.' });
    }

    // No token is generated now
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
