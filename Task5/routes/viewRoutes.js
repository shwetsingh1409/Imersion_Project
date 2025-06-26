const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Home - list all vehicles
router.get('/', isAuthenticated, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('index', { vehicles });
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

// Create vehicle form
router.get('/vehicles/new', isAuthenticated, (req, res) => {
  res.render('new');
});
