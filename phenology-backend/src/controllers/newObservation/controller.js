const express = require("express");
const logger = require("../../config/logger");
const service = require("./service");
const createError = require("http-errors");
//const Observation = require("../../models/observation.model");

const currentModel = require('../../models/observation.model');
const currentService = require('./service');

/*
// Read.
exports.findAll = (req, res, next) => {
  return service.findAll().then((observations) => {
    // logger.debug(`Get all observations, returning ${observations.length} items.`);
    res.json(observations);
  });
};

// Get one.
exports.findOne = (req, res, next) => {
  return service.findOne(req.params.id)
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
  
*/

// Create.

const checkModel = (model, body, next) => {
  const validationErrors = new model(body).validateSync();
  if (validationErrors) {
      next(
          new createError.BadRequest(
              JSON.stringify({
                  message: 'Scmema validation error',
                  error: validationErrors
              })
          )
      );
      return false;
  }
  return true;
};

module.exports.create = (req, res, next) => {
  console.log(req.body);
  if (!checkModel(currentModel, req.body, next)) {
      return;
  }

  return currentService.create(req.body)
      .then(cp => {
          res.status(201);
          res.json(cp);
      })
      .catch(err => next(new createError.InternalServerError(err.message)));
};

/*
exports.create = (req, res, next) => {
  const { date, plant, phase } = req.body;
  if (!date || !plant || !phase) {
    return next(
      new createError.BadRequest(
        "Request body must contain date, plant, phase parameters"
      )
    );
  }
  const newObservation = {
    date: date,
    plant: plant,
    phase: phase,
  };
  return service
    .create(newObservation)
    .then((observation) => {
      res.status(201);
      res.json(observation);
    })
    .catch((err) => next(new createError.InternalServerError(err.message)));
};



// Update.
exports.update = (req, res, next) => {
  const id = req.params.id;
  const { date, plant, phase } = req.body;
  if (!date || !plant || !phase) {
    return next(new createError.BadRequest("Missing properties!"));
  }
  const update = {
    date: date,
    plant: plant,
    phase: phase,
  };
  return service
    .update(req.params.id, update)
    .then((observation) => {
      res.json(observation);
    })
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};

// Delete.
exports.delete = (req, res, next) => {
  return service
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};
*/