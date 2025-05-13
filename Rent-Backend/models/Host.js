const mongoose = require('mongoose')

const hostSchema = mongoose.Schema({
  image: {
    type: String
  },
  fullName: {
    type: String,
    required: true
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
    unique: true
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
  addressLine: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  state: {
    type: String,
    // required: true
  },
  pincode: {
    type: String,
    // required: true
  },
  idType: {
    type: String,
    // required: true
  },
  idNumber: {
    type: String,
    // required: true,
    // unique: true
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

module.exports = mongoose.model("Host", hostSchema);