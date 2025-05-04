// const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

// const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = razorpay;