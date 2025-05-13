const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Host = require("../models/Host");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendSms = require("../utils/twilio");
const passport = require("passport");
require("dotenv").config();

exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      secName,
      userName,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;
    const imagePath = req.file.path;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
      image: imagePath,
      firstName,
      secName,
      userName,
      email,
      isVerified: false,
      otp,
      phone,
      password,
      confirmPassword,
    });
    // const url = `http://localhost:3000/auth/verify-email?otp=${otp}`;
    await sendVerificationEmail(email, otp);
    res.status(201).json({
      user,
      message:
        "Check your email to verify your account, as you won't be able to login until you verify your account.",
    });
  } catch (error) {
    console.error("Register user failed:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during user registration." });
  }
};

exports.registerHost = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      addressLine,
      city,
      state,
      pincode,
      idType,
      idNumber,
    } = req.body;
    const imagePath = req.file.path;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const hostExists = await Host.findOne({ email });
    if (hostExists) {
      return res.status(400).json({ message: "User already exists." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const host = await Host.create({
      image: imagePath,
      fullName,
      email,
      isVerified: false,
      otp,
      phone,
      password,
      confirmPassword,
      addressLine,
      city,
      state,
      pincode,
      idType,
      idNumber,
    });
    // const url = `http://localhost:3000/auth/verify-email?otp=${otp}`;
    await sendVerificationEmail(email, otp);
    res.status(201).json({
      host,
      message:
        "Check your email to verify your account, as you won't be able to login until you verify your account.",
    });
  } catch (error) {
    console.error("Register host failed:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during host registration." });
  }
};

const sendVerificationEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `DriveEase ${process.env.GMAIL_USER}`,
    to,
    subject: "Verify your email",
    html: `<h1><b>Verify your email</b></h1>
      <br>
      <p>
        You need to verify your email address to continue using your DriveEase account. Enter the following code to verify your email address.
      </P><br>
      <h1><b>${otp}</b></h1>
    `,
  });
};

// authController.js
exports.verifyEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;
    // console.log(otp);
    const user = await User.findOne({ _id: id });
    // console.log(user);
    if (user) {
      if (user.otp !== otp)
        return res
          .status(400)
          .json({ message: "Wrong otp entered / otp expired" });

      user.isVerified = true;
      user.otp = null;
      await user.save();
      res.json({ message: "Email verified successfully" });
    }

    const host = await Host.findOne({ _id: id });
    if (host) {
      if (host.otp !== otp)
        return res
          .status(400)
          .json({ message: "Wrong otp entered / otp expired" });

      host.isVerified = true;
      host.otp = null;
      await host.save();
      res.json({ message: "Email verified successfully" });
    }
    return res.json({ message: "User not found." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during registration." });
  }
};

exports.resendOtp = async (req, res) => {
  const { id } = req.params;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const user = await User.findOne({ _id: id });
  if (user) {
    user.otp = otp;
    await user.save();
    await sendVerificationEmail(user.email, otp);
    res.json({ message: "Otp Sent Successfully" });
  }
  const host = await Host.findOne({ _id: id });
  if (host) {
    host.otp = otp;
    await host.save();
    await sendVerificationEmail(host.email, otp);
    res.json({ message: "Otp Sent Successfully" });
  }
  return res.json({ message: "User not found." });
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("i am inside the log in user");
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email });
    console.log(user);
    // if (!user.isVerified)
    //   return res.status(401).json({ message: "Email not verified" });
    if (user) {
      console.log("I am in user");
      if (user.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const token = jwt.sign({ id: user._id }, "12345");
      console.log(token);
      return res.status(200).json({ user, token, type: "user" });
    }

    const host = await Host.findOne({ email });
    console.log(host);
    // console.log(host);
    // if (!host.isVerified)
    //   return res.status(401).json({ message: "Email not verified" });
    if (host) {
      console.log("i am inside the host");
      if (host.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const token = jwt.sign({ id: host._id }, "12345");
      return res.status(200).json({ user: host, token, type: "host" });
    }
    return res.json({ message: "User not found." });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Something went wrong during login." });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.body);
    const userId = new mongoose.Types.ObjectId(id);

    const user = await User.findOne({ _id: userId });
    if (user) {
      let imagePath = req.body.previousImage;
      if (req.file) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            // console.log("Error while removing", err);
          }
        });
        imagePath = req.file.path;
      }

      const name = req.body.name;
      const arrName = name.split(" ");
      const updatedUser = {
        image: imagePath,
        firstName: arrName[0],
        secName: arrName[1] || "",
        email: req.body.email,
        phone: req.body.phone,
      };

      const modifiedUser = await User.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return res.json(modifiedUser);
    }

    const host = await Host.findOne({ _id: userId });
    if (host) {
      let imagePath = req.body.previousImage;
      if (req.file) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            // console.log("Error while removing", err);
          }
        });
        imagePath = req.file.path;
      }

      const address = req.body.address;
      const arrAddress = address.split(", ");
      const updatedUser = {
        image: imagePath,
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        addressLine: arrAddress[0] || "",
        city: arrAddress[1] || "",
        state: arrAddress[2] || "",
        pincode: arrAddress[3] || "",
      };

      const modifiedUser = await Host.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return res.json(modifiedUser);
    }

    return res.status(404).json({ message: "User or Host not found" });
  } catch (err) {
    console.error("Error in updateUser:", err);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, newPassword, confirmPassword } = req.body;
    const userId = new mongoose.Types.ObjectId(id);

    const user = await User.findOne({ _id: userId });
    if (user) {
      if (user.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const updatedUser = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };
      const modifiedUser = await User.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return res.json(modifiedUser);
    }

    const host = await Host.findOne({ _id: userId });
    if (host) {
      if (host.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const updatedUser = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };
      const modifiedUser = await Host.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return res.json(modifiedUser);
    }

    return res.status(404).json({ message: "User or Host not found." });
  } catch (err) {
    console.error("Error in updatePassword:", err);
    res.status(500).json({ message: "Server error while updating password." });
  }
};

exports.sendOtp = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // if (!user) return res.status(404).json({ message: "User not found" });
  console.log("Sending Otp", otp);

  if (user) {
    user.phoneOtp = otp;
    await user.save();

    try {
      await sendSms("+91" + user.phone, `Your verification OTP is ${otp}`);
      return res.json({ message: "OTP sent successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  }
  const host = await Host.findOne({ _id: id });
  if (host) {
    host.phoneOtp = otp;
    await host.save();

    try {
      await sendSms("+91" + host.phone, `Your verification OTP is ${otp}`);
      return res.json({ message: "OTP sent successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  }
  return res.json({ message: "User not found." });
};

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  // if (!user) return res.status(404).json({ message: "User not found" });
  if (user) {
    if (user.phoneOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isPhoneVerified = true;
    user.phoneOtp = null;
    await user.save();
    res.json({ message: "Mobile number verified successfully" });
  }
  const host = await Host.findOne({ _id: id });
  if (host) {
    if (host.phoneOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    host.isPhoneVerified = true;
    host.phoneOtp = null;
    await host.save();
    res.json({ message: "Mobile number verified successfully" });
  }
  return res.json({ message: "User not found." });
};

exports.resendPhoneOtp = async (req, res) => {
  const { id } = req.params;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Resending Otp", otp);
  const user = await User.findOne({ _id: id });
  if (user) {
    user.phoneOtp = otp;
    await user.save();
    await sendSms("+91" + user.phone, `Your verification OTP is ${otp}`);
    res.json({ message: "Otp Sent Successfully" });
  }
  const host = await Host.findOne({ _id: id });
  if (host) {
    host.phoneOtp = otp;
    await host.save();
    await sendSms("+91" + host.phone, `Your verification OTP is ${otp}`);
    res.json({ message: "Otp Sent Successfully" });
  }
  return res.json({ message: "User not found." });
};

exports.googleUserLogin = (req, res) => {
  passport.authenticate(
    "google-user",
    { failureRedirect: "/login" },
    (err, user) => {
      // console.log("This is the error");
      // console.log(err);
      // console.log("This is the user");
      console.log("This has come to the controller");
      console.log(user);
      if (err || !user) {
        console.log("There is no user");
        return res.redirect("http://localhost:5173/user/signup");
      }
      // const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
      // const token = jwt.sign({ id: user._id }, "12345");
      return res.redirect(
        `http://localhost:5173/user/login?email=${user.user.email}&type=user`
      );
    }
  )(req, res);
};

exports.googleHostLogin = (req, res) => {
  passport.authenticate(
    "google-host",
    { failureRedirect: "/login" },
    (err, host) => {
      // console.log("This is the error");
      // console.log(err);
      // console.log("This is the user");
      console.log(host);
      if (err || !host) {
        console.log(err);
        return res.redirect("http://localhost:5173/user/signup");
      }
      // const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
      // const token = jwt.sign({ id: user._id }, "12345");
      return res.redirect(
        `http://localhost:5173/user/login?token=${host.token}&email=${host.host.email}&type=host`
      );
    }
  )(req, res);
};

exports.verifyEmailForPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const user = await User.findOne({ email });
  if (user) {
    user.otp = otp;
    await user.save();
    await sendVerificationEmail(email, otp);
    return res.json({ user });
  }
  const host = await Host.findOne({ email });
  if (host) {
    host.otp = otp;
    await host.save();
    await sendVerificationEmail(email, otp);
    return res.json({ user: host });
  }
  res.json({ message: "Account not found" });
};

exports.modifyPassword = async (req, res, next) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.json({ message: "Password and confirm password doesn't match" });
  }
  const user = await User.findOne({ _id: id });
  if (user) {
    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();
    return res.json({ user });
  }
  const host = await Host.findOne({ _id: id });
  if (host) {
    host.password = password;
    host.confirmPassword = confirmPassword;
    await host.save();
    return res.json({ user: host });
  }
  // return res.json({ message: "User not found" })
};
