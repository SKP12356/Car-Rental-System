const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  frLicense: {
    type: String,
    required: true
  },
  baLicense: {
    type: String,
    required: true
  },
  gId: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Document", documentSchema);
