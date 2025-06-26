const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  price: Number,
  image: String,
  desc: String,
  brand: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
