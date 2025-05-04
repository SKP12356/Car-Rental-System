const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    // required: true,
  },
  car: {
    type: String,
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
    required: true
  },
  completedAt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("History", historySchema);
