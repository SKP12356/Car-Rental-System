// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const Host = require("../models/Host");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Google OAuth Strategy
passport.use(
  "google-user",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_USER_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        console.log("This is the user google id");
        console.log(profile.id);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create new user if not found
          console.log("The user not already exist");
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            secName: profile.name.familyName,
            userName: profile.name.familyName + profile.name.givenName,
            email: profile.emails[0].value,
            isVerified: true,
            // phone: Math.random(),
            password: profile.emails[0].value.slice(0, 5),
            // confirmPassword: null,
          });

          await user.save();
          // return res.json({ message: "Successfully registered "})
          console.log("This is not going to the controller", user)
          return res.redirect("http://localhost:5173/user/login");
        } else {
          // const token = jwt.sign({ id: user._id }, "12345");
          console.log("The user already exist");
          return done(null, { user });
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  "google-host",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_HOST_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        console.log("This is the host google id");
        console.log(profile.id);
        let host = await Host.findOne({ googleId: profile.id });
        if (!host) {
          // Create new user if not found
          console.log("The host not already exist");
          host = new Host({
            googleId: profile.id,
            fullName: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            isVerified: true,
            phone: Math.random(),
            password: profile.emails[0].value.slice(0, 5),
            confirmPassword: null,
          });
          console.log(host);
          await host.save();
          return res.redirect("http://localhost:5173/user/login");
        } else {
          const token = jwt.sign({ id: host._id }, "12345");
          console.log("The user already exist");
          return done(null, { host, token });
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user (if using session-based auth)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

module.exports = passport;
