// require('dotenv').config();
const config = require('config');

// const { v4: uuidv4 } = require('uuid');
// const firebaseAdmin = require('firebase-admin');
const express = require('express');
// const multer = require('multer');
// const fileExtension = require('file-extension')
// const serviceAccount = require('../config/phenology-af2ec-firebase-adminsdk-fb5ti-973100cbd5.json');
// console.log(serviceAccount.type)

const morgan = require("morgan");
const logger = require('./config/logger');
const cors = require('./config/cors');

const app = express();
// const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Database connection.
// mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const { username, password, host } = config.get('database');
mongoose
    // .connect(`mongodb+srv://${username}:${password}@${host}`, {
    .connect(` mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority`, {
    // .connect(`mongodb://${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => logger.info('MongoDB connection has been established successfully.'))
    .catch( err => {
        logger.error(err);
        process.exit();
    });



// mongodb+srv://User:35Nx0t65aNmizeLQ@cluster0.r2fm3.mongodb.net/phenology?retryWrites=true&w=majority

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// static files
app.use(express.static('public'));

// request logging
app.use(morgan('combined', { stream: logger.stream }));


// // Configure Storage
// var storage = multer.diskStorage({

//   // Setting directory on disk to save uploaded files
//   destination: function (req, file, cb) {
//       cb(null, 'my_uploaded_files')
//   },

//   // Setting name of file saved
//   filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
//   }
// })

// const upload = multer({
//   dest: 'uploads/',
//   storage: storage,
//   limits: {
//       // Setting Image Size Limit to 2MBs
//       fileSize: 2000000
//   },
//   fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           //Error 
//           cb(new Error('Please upload JPG and PNG images only!'))
//       }
//       //Success 
//       cb(undefined, true)
//   }
// })

// app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
//   const file = req.file
//   console.log(req);
//   if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//   }
//   res.status(200).send({
//       statusCode: 200,
//       status: 'success',
//       uploadedFile: file
//   })

// }, (error, req, res, next) => {
//   res.status(400).send({
//       error: error.message
//   })
// })

// Router.
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

// app.use('/plants', authenticateJwt, require('./controllers/plants/routes'));
app.use('/plants', require('./controllers/plants/routes'));
app.use('/observations', require('./controllers/observations/routes'));
app.use('/users', authenticateJwt, require('./controllers/user/routes'));

// error handling
app.use((err, req, res, next) => {
	logger.error(`ERR ${err.statusCode}: ${err.message}`);
	res.status(err.statusCode);
	res.json({
		hasError: true,
		message: err.message
	});
});

module.exports = app;
