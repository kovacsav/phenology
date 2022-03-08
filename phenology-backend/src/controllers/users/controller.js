const express = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const currentModel = require("../../models/user.model");
const currentService = require("./service");
const register = require("../../auth/register");
const req = require("express/lib/request");
const { Console } = require("console");

const checkModel = (model, body, next) => {
  const validationErrors = new model(body).validateSync();
  if (validationErrors) {
    next(
      new createError.BadRequest(
        JSON.stringify({
          message: "Scmema validation error",
          error: validationErrors,
        })
      )
    );
    return false;
  }
  return true;
};

const checkEmailExist = (email) => {
  currentService.findOneParam(email).then((user) => {
    if (user !== null) {
      return true;
    }
    return false;
  });
};

/*
const checkEmailExist = async (email) => {
    const isExistUser = await currentService.findOneParam(email)
    .then 
    console.log(isExistUser);
    if (isExistUser == null) {
        return false;
    };
    console.log("Ezzel az email címmel már regisztráltak.");
    return true;
  };
*/

// Verify User - set User's status to "active" after get the
// confirmations code

module.exports.verifyUser = (req, res, next) => {
  currentModel.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.active = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e))
    .then((cp) => {
      res.status(201).send({message: 'Confirmation success'});
      //res.json(cp);
    })
};
  
  /*
  return currentService
    .findOneByConfirmationcode(req.params.confirmationCode)
    .then( () => {
      res.status(201);
    })
    .catch((err) => next(new createError.InternalServerError(err.message)))
  };
  */

// Create.

module.exports.create = (req, res, next) => {
  if (!checkModel(currentModel, req.body, next)) {
    console.log("checkModel hibát talált");
    return;
  }

  // if email is already exsist
  currentService.findOneParam({ email: req.body.email }).then((user) => {
    if (user !== null) {
      return next(
        new createError.BadRequest(
          JSON.stringify({
            message: "Ezzel az email címmel már regisztráltak.",
          })
        )
      );
    }

    // if user is new
    // set confrimation code
    confirmationCode = jwt.sign({ email: req.body.email }, process.env.SECRET);
    req.body.confirmationCode = confirmationCode;

    return (
      currentService
        .create(req.body)
        .then((cp) => {
          res.status(201);
          res.json(cp);
        })
        // Send confirmation email
        .then(
          register.sendEmail(
            req.body.firstName + " " + req.body.lastName,
            req.body.email,
            confirmationCode
          )
        )
        .catch((err) => next(new createError.InternalServerError(err.message)))
    );
  });
};

// Read.
module.exports.findAll = (req, res, next) => {
  return currentService.findAll().then((items) => {
    res.json(items);
  });
};

// Read one.
module.exports.findOne = (req, res, next) => {
  return currentService.findOne(req.params.id).then((item) => {
    if (!item) {
      return next(new createError.NotFound("User is not found"));
    }
    return res.json(item);
  });
};

// Update.
module.exports.update = (req, res, next) => {
  if (!checkModel(currentModel, req.body, next)) {
    return;
  }

  return currentService
    .update(req.params.id, req.body)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};

// Delete.
module.exports.delete = (req, res, next) => {
  return currentService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};
