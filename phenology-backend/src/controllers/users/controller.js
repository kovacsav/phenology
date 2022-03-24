const express = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");


const currentModel = require("../../models/user.model");
//const Token = require("../../models/token.model");
const currentService = require("./service");
//const register = require("../../auth/register");
const req = require("express/lib/request");
const { Console } = require("console");



user = new currentModel();

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
  currentModel
    .findOne({
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
    .then(() => {
      res.status(201).send({ message: "Confirmation success" });
    });
};

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
          currentService.sendRegistrationConfirmationEmail(
            req.body.firstName + " " + req.body.lastName,
            req.body.email,
            confirmationCode
          )
        )
        .catch((err) => next(new createError.InternalServerError(err.message)))
    );
  });
};

// https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
// send new password link
module.exports.sendNewPasswordLink = (req, res, next) => {
  return (currentService.requestPasswordReset(req.params.email)
  .then(
    res.status(201).send({ message: "New password link sent." }))
  .catch((err) => next(new createError.InternalServerError(err.message)))
  );
};


/*
  email = req.params.email;
  currentModel.findOne({ email }).then((user) => {
    if (!user) {
      throw new Error("User does not exist");
    };
    Token.findOne({ userId: user._id }).then((token) => {
      if (token) {
        token.deleteOne();
      }
    });
  });
*/
//return currentService.findAll().then((items) => {
//  res.json(items);
//});

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

// Set new password
module.exports.setNewPassword = (req, res, next) => {
  return currentService
    .resetPassword(req.body.token, req.body.userID, req.body.newPassword)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};

// Update.
module.exports.update = (req, res, next) => {
  /*if (!checkModel(currentModel, req.body, next)) {
    return;
  }
*/
  return currentService
    .update(req.body)
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
