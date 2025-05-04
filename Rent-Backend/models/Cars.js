const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: Object,
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  doors: {
    type: Number,
    required: true,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
  },
  description: {
    type: String,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    required: true
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available"
  },
  bookedUntil: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Cars", carSchema);
