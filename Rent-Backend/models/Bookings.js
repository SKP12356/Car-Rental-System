const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cars",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
  amount: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  bookedAt: {
    type: String,
    required: true,
  },
  completedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
