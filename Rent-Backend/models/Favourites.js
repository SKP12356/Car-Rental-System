const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cars",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
