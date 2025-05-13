const Cars = require("../models/Cars");
const fs = require("fs");
const path = require("path");
const autoUpdateCarAvailability = require("../utils/helper");

const Booking = require("../models/Bookings");

exports.addCars = async (req, res, next) => {
  try {
    const {
      make,
      model,
      year,
      color,
      licensePlate,
      location,
      vehicleType,
      fuelType,
      transmission,
      seats,
      doors,
      dailyRate,
      mileage,
      features,
      description,
    } = req.body;
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image." });
    }
    const imagePath = req.files.map((file) => file.path);
    const car = new Cars({
      make,
      model,
      year,
      color,
      licensePlate,
      location: JSON.parse(location),
      vehicleType,
      fuelType,
      transmission,
      seats,
      doors,
      dailyRate,
      mileage,
      features,
      image: imagePath,
      description,
      host: req.user.id,
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

exports.getCars = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const cars = await Cars.find().populate(
      "host",
      "image fullName _id email phone city state addressLine"
    );
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

exports.editCars = async (req, res, next) => {
  try {
    const { id } = req.params;
    let existingImages = [];
    try {
      if (req.body.existingImage) {
        existingImages = JSON.parse(req.body.existingImage);
      }
    } catch (error) {
      console.error("Failed to parse existingImage:", error.message);
    }

    if (req.files?.length > 0) {
      existingImages.forEach((filePath) => {
        const fullPath = path.resolve(__dirname, "..", filePath);
        fs.unlink(fullPath, (err) => {
          if (err) console.error("Error deleting file:", err.message);
        });
      });
    }

    const imagePaths =
      req.files?.length > 0
        ? req.files.map((file) => file.path)
        : existingImages;

    const updatedCarData = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      licensePlate: req.body.licensePlate,
      location: JSON.parse(req.body.location),
      vehicleType: req.body.vehicleType,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission,
      seats: req.body.seats,
      doors: req.body.doors,
      dailyRate: req.body.dailyRate,
      mileage: req.body.mileage,
      features: req.body.features,
      image: imagePaths,
      description: req.body.description,
    };

    const updatedCar = await Cars.findByIdAndUpdate(id, updatedCarData, {
      new: true,
    });

    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
};

exports.deleteCars = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deletedCar = await Cars.findByIdAndDelete(id);
    let imagePath = deletedCar.image;
    fs.unlink(imagePath, (err) => {
      if (err) {
        // console.log("Error while removing", err);
      }
    });
    res.status(204).json({ _id: id });
  } catch (error) {
    next(error);
  }
};

exports.getMyCars = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const hostCars = await Cars.find({ host: req.user.id });
    res.json(hostCars);
  } catch (error) {
    next(error);
  }
};

exports.getCarDetails = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const { id } = req.params;
    const detailsCar = await Cars.findOne({ _id: id }).populate(
      "host",
      "image fullName _id email phone"
    );
    res.json(detailsCar);
  } catch (error) {
    next(error);
  }
};

exports.searchHistory = async (req, res, next) => {
  try {
    await autoUpdateCarAvailability();
    const text = req.query.search;
    const matchedCars = await Cars.find({
      $or: [
        { make: { $regex: text, $options: "i" } },
        { model: { $regex: text, $options: "i" } },
      ],
    }).select("_id");

    const matchedCarIds = matchedCars.map((car) => car._id);
    let cars = await Booking.find({
      host: req.user.id,
      $or: [
        { bookId: { $in: matchedCarIds } },
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
