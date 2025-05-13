const Favourite = require("../models/Favourites");
const fs = require("fs");
const Booking = require("../models/Bookings");
const mongoose = require("mongoose");
const Cars = require("../models/Cars");
const razorpay = require("../utils/razorpay");
const User = require("../models/User");
const Host = require("../models/Host");
// const Document = require("../models/Documents")
const autoUpdateCarAvailability = require("../utils/helper");
const Document = require("../models/Documents");
const History = require("../models/History");

// const autoUpdateCarAvailability = async () => {
//   const now = new Date();
//   await Cars.updateMany(
//     { status: "unavailable", unavailableUntil: { $lte: now } },
//     { $set: { status: "available", unavailableUntil: null } }
//   );
// };

exports.getFavourites = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const favCars = await Favourite.find({ user: req.user.id }).populate(
      "carId"
    );
    const favouriteCars = favCars.map((fav) => fav.carId);
    res.json(favouriteCars);
  } catch (error) {
    next(error);
  }
};

exports.postFavourites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existedFav = await Favourite.findOne({
      carId: id,
      user: req.user.id,
    });
    // console.log(existedFav);
    if (existedFav) {
      return res.json({ message: "Already in favourites" });
    }
    let favCar = new Favourite({ carId: id, user: req.user.id });
    await favCar.save();
    // this is to access the full car object not only object or userId to send to the frontend
    const car = await Cars.findById(id);
    res.json(car);
  } catch (error) {
    next(error);
  }
};

exports.deleteFavourites = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Favourite.findOneAndDelete({ carId: id, user: req.user.id });
    res.status(204).json({ _id: id });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await User.findOne({ _id: userId });
    if (user) {
      const bookCars = await Booking.find({ user: req.user.id })
        .populate("bookId")
        .populate("user", "image firstName secName phone")
        .populate("host", "fullName image phone");
      // const bookingCars = bookCars.map((book) => book.bookId);
      // res.json(bookingCars);
      res.json(bookCars);
    }
    const host = await Host.findOne({ _id: userId });
    if (host) {
      const bookCars = await Booking.find({ host: req.user.id })
        .populate("bookId")
        .populate("user", "image firstName secName phone")
        .populate("host", "fullName image phone");
      // const bookingCars = bookCars.map((book) => book.bookId);
      // res.json(bookingCars);
      res.json(bookCars);
    }
  } catch (error) {
    next(error);
  }
};

exports.postBookings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, paymentId, orderId, unavailableTime } = req.body;
    // console.log(req.user);
    if (!paymentId || !orderId) {
      return res.status(400).json({ message: "Payment unsuccessful" });
    }
    const car = await Cars.findById(id);
    const alreadyBooked = await Booking.findOne({
      bookId: id,
      user: req.user.id,
    });
    if (alreadyBooked) {
      return res.json({ message: "Already booked this car" });
    }
    const date = new Date();
    const formattedDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0");

    // console.log(formattedDate);

    date.setTime(date.getTime() + unavailableTime * 60 * 60 * 1000);
    const newformattedDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0");

    // console.log(newformattedDate);

    let bookCar = new Booking({
      bookId: id,
      user: req.user.id,
      host: car.host.toString(),
      amount: value,
      paymentId,
      orderId,
      bookedAt: formattedDate,
      completedAt: newformattedDate,
    });
    await bookCar.save();
    const unavailableHours = new Date(
      date.getTime() + unavailableTime * 60 * 60 * 1000
    );
    car.status = "unavailable";
    car.bookedUntil = unavailableHours;
    const carName = car.make + " " + car.model;
    let history = new History({
      user: req.user.id,
      car: carName,
      amount: value,
      paymentId,
      orderId,
      bookedAt: formattedDate,
      completedAt: newformattedDate,
    });
    await history.save();
    let hostHistory = new History({
      host: car.host.toString(),
      car: carName,
      amount: value,
      paymentId,
      orderId,
      bookedAt: formattedDate,
      completedAt: newformattedDate,
    });
    await car.save();
    await hostHistory.save();
    res.json(car);
  } catch (error) {
    next(error);
  }
};

exports.deleteBookings = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Booking.findOneAndDelete({ bookId: id, user: req.user.id });
    res.status(204).json({ _id: id });
  } catch (error) {
    next(error);
  }
};

exports.searchCars = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const text = req.query.search;
    // console.log(text)
    let cars = await Cars.find({
      $or: [
        { make: { $regex: text, $options: "i" } },
        { model: { $regex: text, $options: "i" } },
        { "location.location": { $regex: text, $options: "i" } },
      ],
    }).populate("host", "image fullName _id email phone");

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

exports.paymentBookings = async (req, res, next) => {
  try {
    const options = {
      amount: Math.round(req.body.amount * 100), // ₹245 → 24500 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
};

exports.reqDocuments = async (req, res, next) => {
  try {
    // console.log(req.files);
    const frLicensePath = req.files.frLicense[0].path;
    const baLicensePath = req.files.baLicense[0].path;
    const gIdPath = req.files.gId[0].path;

    const newDoc = new Document({
      userId: req.user.id,
      frLicense: frLicensePath,
      baLicense: baLicensePath,
      gId: gIdPath,
    });

    const savedDoc = await newDoc.save();
    res
      .status(201)
      .json({ message: "Documents uploaded successfully", document: savedDoc });
  } catch (error) {
    console.error("Error uploading documents:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getDocuments = async (req, res, next) => {
  try {
    // await autoUpdateCarAvailability()
    // console.log(req.user.id);
    const documents = await Document.find({ userId: req.user.id });
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const user = await User.findOne({ _id: userId });
    if (user) {
      const history = await History.find({ user: req.user.id });
      res.json(history);
    }
    const host = await Host.findOne({ _id: userId });
    if (host) {
      const history = await History.find({ host: req.user.id });
      res.json(history);
    }
  } catch (error) {
    next(error);
  }
};

exports.fetchPopular = async (req, res, next) => {
  try {
    const topFavoritedCars = await Favourite.aggregate([
      {
        $group: {
          _id: "$carId",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 2 }, // Only where count > 2
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $lookup: {
          from: "cars",
          localField: "_id",
          foreignField: "_id",
          as: "carDetails",
        },
      },
    ]);
    res.status(200).json(topFavoritedCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch top favorited cars" });
  }
};

exports.updateDocuments = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    let frontRef = req.body.existingFrontdl;
    let backRef = req.body.existingBackdl;
    let gidRef = req.body.existingGid;
    // console.log(req.files)
    if (req.files.frLicense) {
      if (frontRef) fs.unlinkSync(frontRef);
      frontRef = req.files.frLicense[0].path;
    }
    if (req.files.baLicense) {
      if (backRef) fs.unlinkSync(backRef);
      backRef = req.files.baLicense[0].path;
    }
    if (req.files.gId) {
      if (gidRef) fs.unlinkSync(gidRef);
      gidRef = req.files.gId[0].path;
    }
    const updatedDocs = {
      user: req.user.id,
      frLicense: frontRef,
      baLicense: backRef,
      gId: gidRef,
    };
    const updatedDoc = await Document.findByIdAndUpdate(id, updatedDocs, {
      new: true,
    });
    res.json(updatedDoc);
  } catch (error) {
    next(error);
  }
};

exports.searchHistory = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const text = req.query.search;
    // console.log(text)
    let cars = await Booking.find({
      host: req.user.id,
      $or: [
        { "bookId.make": { $regex: text, $options: "i" } },
        { "bookId.model": { $regex: text, $options: "i" } },
        { "host.fullName": { $regex: text, $options: "i" } },
      ],
    })
      .populate("bookId")
      .populate("user", "image firstName secName phone")
      .populate("host", "fullName image phone");

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
