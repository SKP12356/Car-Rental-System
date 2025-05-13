const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/Auth");
const upload = require("../middlewares/upload");

userRouter.get("/favourite", verifyToken, userController.getFavourites);
userRouter.post("/favourite/:id", verifyToken, userController.postFavourites);
userRouter.delete(
  "/favourite/:id",
  verifyToken,
  userController.deleteFavourites
);
userRouter.get("/bookings", verifyToken, userController.getBookings);
userRouter.post("/bookings/:id", verifyToken, userController.postBookings);
userRouter.delete("/bookings/:id", verifyToken, userController.deleteBookings);
userRouter.get("/", verifyToken, userController.searchCars);
userRouter.post("/payment", userController.paymentBookings);
userRouter.post(
  "/documents",
  upload.fields([
    { name: "frLicense", maxCount: 1 },
    { name: "baLicense", maxCount: 1 },
    { name: "gId", maxCount: 1 },
  ]),
  verifyToken,
  userController.reqDocuments
);
userRouter.put(
  "/uplodedDocs/:id",
  verifyToken,
  upload.fields([
    { name: "frLicense", maxCount: 1 },
    { name: "baLicense", maxCount: 1 },
    { name: "gId", maxCount: 1 },
  ]),
  userController.updateDocuments
);
userRouter.get("/uplodedDocs", verifyToken, userController.getDocuments);
userRouter.get("/history", verifyToken, userController.getHistory);
userRouter.get("/popular", userController.fetchPopular);

module.exports = userRouter;
