const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register Route - POST
router.post('/register', async (req, res) => {
  const { username, password, email, age } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error', 'Username already exists');
      return res.redirect('/register');
    }

    // Create new user
    const user = new User({ username, password, email, age });
    await user.save();

    req.flash('success', 'Registered successfully. Please log in.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
});

// Login Route - POST
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout Route - GET
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      req.flash('error', 'Logout failed');
      return res.redirect('/');
    }
    req.flash('success', 'Logged out successfully');
    res.redirect('/login');
  });
});

module.exports = router;
