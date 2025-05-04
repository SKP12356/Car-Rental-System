const express = require('express')
const hostRouter = express.Router()
const hostController = require("../controllers/hostController")
const multer = require('multer')
const path = require('path')
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/Auth')

// Serve static files from the uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save to the uploads directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   }
// });

// const upload = multer({ storage: storage });

hostRouter.get("/", hostController.getCars)
hostRouter.post("/", verifyToken, upload.array("image",5), hostController.addCars)
hostRouter.delete("/:id", verifyToken, hostController.deleteCars)
hostRouter.put("/:id", verifyToken, upload.array("image",5), hostController.editCars)
hostRouter.get("/mycars", verifyToken, hostController.getMyCars);
hostRouter.get("/details/:id", hostController.getCarDetails)
hostRouter.get("/searchHistory", verifyToken,hostController.searchHistory)

module.exports = hostRouter