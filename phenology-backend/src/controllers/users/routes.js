const express = require("express");
const controller = require('./controller');

const router = express.Router();

// confirmation email
router.get('/confirm/:confirmationCode', (req, res, next) => {
  //console.log(req.params.confirmationCode);
  return controller.verifyUser(req, res, next);
});

// create registration
router.post('/register', (req, res, next) => {
  return controller.create(req, res, next);
});

// new password request
router.get('/newpassword/:email', (req, res, next) => {
  //console.log(req.params.email);
  return controller.sendNewPasswordLink(req, res, next);
});

// set new password
router.post('/setnewpassword', (req, res, next) => {
  //console.log(req.body);
  return controller.setNewPassword(req, res, next);
});

// read
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next);
});

// update
router.post('/profileupdate', (req, res, next) => {
  //console.log("routes");
  return controller.update(req, res, next);
});

/*
router.patch('/:id', (req, res, next) => {
  return controller.update(req, res, next);
});
*/

// delete
router.post('/profiledelete', (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = router;
