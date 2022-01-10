const express = require("express");
const logger = require("../../config/logger");
const currentService = require("./service");
const currentModel = require("../../models/observation.model");
const createError = require("http-errors");

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

// Read.
module.exports.findAll = (req, res, next) => {
  return currentService.findAll().then((observations) => {
    // logger.debug(`Get all observations, returning ${observations.length} items.`);
    res.json(observations);
  });
};

// Get one.
module.exports.findOne = (req, res, next) => {
  return currentService
    .findOne(req.params.id)
    .then((observation) => {
      if (!observation) {
        return next(new createError.NotFound("Observation is not found"));
      }
      res.json(observation);
    })
    .catch((err) => {
      return next(new createError.InternalServerError(err.message));
    });
};

// Create.
module.exports.create = (req, res, next) => {
  if (!checkModel(currentModel, req.body, next)) {
    return next(
      new createError.BadRequest(
        "Request body must contain observation parameters"
      )
    );
  }

  return currentService
    .create(req.body)
    .then((observation) => {
      res.status(201);
      res.json(observation);
    })
    .catch((err) => next(new createError.InternalServerError(err.message)));
};

// exports.create = (req, res, next) => {
//   const { date, plant, phase } = req.body;
//   if (!date || !plant || !phase) {
//     return next(
//       new createError.BadRequest(
//         "Request body must contain date, plant, phase parameters"
//       )
//     );
//   }
//   const newObservation = {
//     date: date,
//     plant: plant,
//     phase: phase,
//   };
//   return service
//     .create(newObservation)
//     .then((observation) => {
//       res.status(201);
//       res.json(observation);
//     })
//     .catch((err) => next(new createError.InternalServerError(err.message)));
// };

// Update.
module.exports.update = (req, res, next) => {
  if (!checkModel(currentModel, req.body, next)) {
    return;
  }

  return currentService
    .update(req.params.id, req.body)
    .then((observation) => {
      res.json(observation);
    })
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};

// exports.update = (req, res, next) => {
//   const id = req.params.id;
//   const { date, plant, phase } = req.body;
//   if (!date || !plant || !phase) {
//     return next(new createError.BadRequest("Missing properties!"));
//   }
//   const update = {
//     date: date,
//     plant: plant,
//     phase: phase,
//   };
//   return currentService
//     .update(req.params.id, update)
//     .then((observation) => {
//       res.json(observation);
//     })
//     .catch((err) => {
//       next(new createError.InternalServerError(err.message));
//     });
// };

// Delete.
module.exports.delete = (req, res, next) => {
  return currentService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};
