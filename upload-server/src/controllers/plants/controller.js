const express = require("express");
const currentService = require("./service");
const currentModel = require("../../models/plant.model");
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
exports.findAll = (req, res, next) => {
  return currentService.findAll().then((plants) => {
    // logger.debug(`Get all plants, returning ${plants.length} items.`);
    res.json(plants);
  });
};

// Get one.
exports.findOne = (req, res, next) => {
  return currentService.findOne(req.params.id).then((plant) => {
    if (!plant) {
      return next(new createError.NotFound("Plant is not found"));
    }
    res.json(plant);
  });
};

// Create.
module.exports.create = (req, res, next) => {
  if (!checkModel(currentModel, req.body, next)) {
    return next(
      new createError.BadRequest("Request body must contain plant parameters")
    );
  }

  return currentService
    .create(req.body)
    .then((plant) => {
      res.status(201);
      res.json(plant);
    })
    .catch((err) => next(new createError.InternalServerError(err.message)));
};

// exports.create = (req, res, next) => {
//   const { name, latin, category } = req.body;
//   if (!name || !latin || !category) {
//     return next(
//       new createError.BadRequest(
//         "Request body must contain name, latin, category parameters"
//       )
//     );
//   }
//   const newPlant = {
//     name: name,
//     latin: latin,
//     category: category,
//   };
//   return service
//     .create(newPlant)
//     .then((plant) => {
//       res.status(201);
//       res.json(plant);
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
    .then((plant) => {
      res.json(plant);
    })
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};

// exports.update = (req, res, next) => {
//   const id = req.params.id;
//   const { name, latin, category } = req.body;
//   if (!name || !latin || !category) {
//     return next(new createError.BadRequest("Missing properties!"));
//   }
//   const update = {
//     name: name,
//     latin: latin,
//     category: category,
//   };
//   return service
//     .update(req.params.id, update)
//     .then((plant) => {
//       res.json(plant);
//     })
//     .catch((err) => {
//       next(new createError.InternalServerError(err.message));
//     });
// };

// Delete.
exports.delete = (req, res, next) => {
  return currentService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => {
      next(new createError.InternalServerError(err.message));
    });
};
