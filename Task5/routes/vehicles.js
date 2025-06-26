const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).send('Unauthorized');
}

router.get('/', isAuthenticated, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

router.post('/', isAuthenticated, async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.status(201).json(vehicle);
});

module.exports = router; // ✅ CRITICAL
