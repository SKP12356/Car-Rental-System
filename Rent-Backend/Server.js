const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");
const rootDir = require("./utils/path");
const expressSession = require("express-session");
const authRouter = require("./routes/authRouter");
<<<<<<< HEAD
require("dotenv").config();

=======
>>>>>>> 32ff78d (Updated multiple files with recent changes)
const app = express();
require("dotenv").config();
const passport = require("passport");
require("./middlewares/passport");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save to the uploads directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   }
// });

// const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req,file,callback) => {
//     callback(null, "uploads/")
//   },
//   filename: (req,file,callback) => {
//     callback(null, Date.now() + '_' + file.originalname);
//   }
// })

// const fileFilter = (req,file,callback) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// }

// const multerOptions = {
//   // storage, fileFilter
//   dest: "uploads/"
// }

app.use(express.urlencoded());
// app.use(multer(multerOptions).single('image'));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));

app.use(express.json());

app.use(cors());
app.use("/host/cars", hostRouter);
app.use("/user/cars", userRouter);
app.use("/auth", authRouter);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET, // A secret key for session signing
    resave: false,  // Prevent re-saving the session if not modified
    saveUninitialized: false,  // Don't save an uninitialized session
    cookie: { secure: false }  // For development (set `secure: true` in production with HTTPS)
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo :", err);
  });

// module.exports = upload;
