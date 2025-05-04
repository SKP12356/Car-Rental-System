// utils/autoUpdate.js
const Cars = require("../models/Cars");

const autoUpdateCarAvailability = async () => {
  const now = new Date();
  await Cars.updateMany(
    { status: "unavailable", bookedUntil: { $lte: now } },
    { $set: { status: "available", bookedUntil: null } }
  );
};

module.exports = autoUpdateCarAvailability;