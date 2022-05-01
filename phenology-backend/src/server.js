// require('dotenv').config();
const config = require("config");
// const fileupload = require("express-fileupload");

// const { v4: uuidv4 } = require('uuid');
// const firebaseAdmin = require('firebase-admin');
const express = require("express");
const fileExtension = require("file-extension");
const multer = require("multer");

// const serviceAccount = require('../config/phenology-af2ec-firebase-adminsdk-fb5ti-973100cbd5.json');
// console.log(serviceAccount.type)

const morgan = require("morgan");
const logger = require("./config/logger");
const cors = require("./config/cors");

const app = express();
// const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Database connection.
// mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority

// Authenctication.
const authenticateJwt = require("./auth/authenticate");
//const adminOnly = require("./auth/adminOnly");
const authHandler = require("./auth/authHandler");

const { username, password, host } = config.get("database");
mongoose
  // .connect(`mongodb+srv://${username}:${password}@${host}`, {
  .connect(
    `mongodb://phenology_u:ph55logy@127.0.0.1:27017/phenology?authSource=admin`,
    //`mongodb+srv://User:Phenology2022@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority`,
    //` mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority`,
    {
      // .connect(`mongodb://${host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    logger.info("MongoDB connection has been established successfully.")
  )
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

// mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// static files: uploaded images
// app.use('/static', express.static('public'))
// frontend:
// http://localhost:3000/static/images/kitten.jpg
const path = require('path');
app.use('/image', express.static(path.join(__dirname, "../phenology_uploaded_files")));
console.log("path:", path.join(__dirname, "../phenology_uploaded_files"));

// request logging
app.use(morgan("combined", { stream: logger.stream }));

// Configure Storage
const storage = multer.diskStorage({
  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "phenology_uploaded_files");
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname//Date.now() + "." + fileExtension(file.originalname)
    );
  },
});

const upload = multer({
  dest: "uploads/",
  storage: storage,
  limits: {
    // Setting Image Size Limit to 2MBs
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //Error
      cb(new Error("Please upload JPG and PNG images only!"));
    }
    //Success
    cb(undefined, true);
  },
});



app.post(
  "/uploadfile",
  upload.single("uploadedImage"),
  (req, res, next) => {
    const file = req.file;
    console.log(req);
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.status(200).send({
      statusCode: 200,
      status: "success",
      uploadedFile: file,
    });
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

// Router.
app.post("/login", authHandler.login);
app.post("/refresh", authHandler.refresh);
app.post("/logout", authHandler.logout);

app.use("/observations", require("./controllers/observations/routes"));

//app.post("/observations/page", require("./controllers/observations/routes"));

//app.post("/observations", authenticateJwt, require("./controllers/observations/routes"));
/*
app.route("/observations")
  .get(require("./controllers/observations/routes"))
  .post(authenticateJwt, require("./controllers/observations/routes"));
/*
app.get("/observations", require("./controllers/observations/routes"));
app.post(
  "/observations",
  authenticateJwt,
  require("./controllers/observations/routes")
);
*/

app.use("/plants", require("./controllers/plants/routes"));
app.use("/articles", require("./controllers/articles/routes"));

//app.use("/users", authenticateJwt, require("./controllers/users/routes"));

app.post("/register", require("./controllers/users/routes"));
app.get("/confirm/:confirmationCode", require("./controllers/users/routes"));
app.get("/newpassword/:email", require("./controllers/users/routes"));
app.post("/setnewpassword", require("./controllers/users/routes"));
app.post("/profileupdate", authenticateJwt, require("./controllers/users/routes"));
app.post("/profiledelete", authenticateJwt, require("./controllers/users/routes"));


// error handling
app.use((err, req, res, next) => {
  logger.error(`ERR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = app;
