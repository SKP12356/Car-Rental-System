const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/Auth");

authRouter.post(
  "/register",
  upload.single("image"),
  authController.registerUser
);
authRouter.post("/verify-email/:id", authController.verifyEmail);
authRouter.post("/resendOtp/:id", authController.resendOtp);
authRouter.post("/verify-phone/:id", authController.sendOtp);
authRouter.post("/verify-otp/:id", authController.verifyOtp);
authRouter.post("/resendPhoneOtp/:id", authController.resendPhoneOtp);
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

authRouter.get('/google', passport.authenticate('google-user', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', authController.googleUserLogin);
authRouter.get('/hostgoogle', passport.authenticate('google-host', { scope: ['profile', 'email'] }));
authRouter.get('/hostgoogle/callback', authController.googleHostLogin);
authRouter.post('/verifyemail-password', authController.verifyEmailForPassword);
authRouter.post('/changePassword/:id', authController.modifyPassword)

module.exports = authRouter;
