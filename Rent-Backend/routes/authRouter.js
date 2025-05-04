const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/Auth");

authRouter.post(
  "/register",
  upload.single("image"),
  authController.registerUser
);
authRouter.post("/login", authController.loginUser);
authRouter.post(
  "/hostregister",
  upload.single("image"),
  authController.registerHost
);
authRouter.put(
  "/updateprofile/:id",
  verifyToken,
  upload.single("image"),
  authController.updateUser
);

authRouter.put(
  "/updatepassword/:id",
  verifyToken,
  authController.updatePassword
);

module.exports = authRouter;
