const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  image: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  secName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    // required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  phone: {
    type: String,
    // required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  phoneOtp: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    // required: true
  },
  googleId: {
    type: String,
    unique: true, 
    sparse: true,  
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,  
  },
})

module.exports = mongoose.model("User", userSchema);