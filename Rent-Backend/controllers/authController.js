const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Host = require("../models/Host");
const fs = require("fs");

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
    const user = await User.create({
      image: imagePath,
      firstName,
      secName,
      userName,
      email,
      phone,
      password,
      confirmPassword,
    });
    res.status(201).json({ user });
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
    const host = await Host.create({
      image: imagePath,
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
    });
    res.status(201).json({ host });
  } catch (error) {
    console.error("Register host failed:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during host registration." });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email });
    if (user) {
      if (user.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const token = jwt.sign({ id: user._id }, "12345");
      res.status(200).json({ user, token, type: "user" });
    }

    const host = await Host.findOne({ email });
    console.log(host);
    if (host) {
      if (host.password !== password) {
        return res.json({ message: "Invalid password." });
      }
      const token = jwt.sign({ id: host._id }, "12345");
      res.status(200).json({ user: host, token, type: "host" });
    }
    return res.json({ message: "User not found." });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Something went wrong during login." });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  // const { image, name, email, phone, address, previousImage } = req.body;
  console.log(id);
  console.log(req.body);
  const userId = new mongoose.Types.ObjectId(id);
  const user = await User.findOne({ _id: userId });
  if (user) {
    let imagePath = req.body.previousImage;
    if (req.file) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Error while removing", err);
        }
      });
      imagePath = req.file.path;
    }
    const name = req.body.name;
    const arrName = name.split(" ");
    const updatedUser = {
      image: imagePath,
      firstName: arrName[0],
      secName: arrName[1],
      email: req.body.email,
      phone: req.body.phone,
    };
    const modifiedUser = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    res.json(modifiedUser);
  }

  const host = await Host.findOne({ _id: userId });
  if (host) {
    let imagePath = req.body.previousImage;
    if (req.file) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Error while removing", err);
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
      addressLine: arrAddress[0],
      city: arrAddress[1],
      state: arrAddress[2],
      pincode: arrAddress[3],
    };
    const modifiedUser = await Host.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    res.json(modifiedUser);
  }
};

exports.updatePassword = async (req, res, next) => {
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
    res.json(modifiedUser);
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
    res.json(modifiedUser);
  }
};
