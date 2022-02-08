const express = require("express");
const service = require("./service");
const createError = require("http-errors");

// Read.
exports.findAll = (req, res, next) => {
  return service.findAll().then((articles) => {
    // logger.debug(`Get all plants, returning ${plants.length} items.`);
    res.json(articles);
  });
};

// Get one.
exports.findOne = (req, res, next) => {
  return service.findOne(req.params.id).then((article) => {
    if (!article) {
      return next(new createError.NotFound("Article is not found"));
    };
    res.json(article);
  });
};

/*
// Create.
exports.create = (req, res, next) => {
  const { name, latin, category } = req.body;
  if (!name || !latin || !category) {
    return next(
      new createError.BadRequest(
        "Request body must contain name, latin, category parameters"
      )
    );
  }
  const newPlant = {
    name: name,
    latin: latin,
    category: category,
  };
  return service
    .create(newPlant)
    .then((plant) => {
      res.status(201);
      res.json(plant);
    })
    .catch((err) => next(new createError.InternalServerError(err.message)));
};

// Update.
exports.update = (req, res, next) => {
  const id = req.params.id;
  const { name, latin, category } = req.body;
  if (!name || !latin || !category) {
    return next(new createError.BadRequest("Missing properties!"));
  }
  const update = {
    name: name,
    latin: latin,
    category: category,
  };
  return service.update(req.params.id, update)
    .then(plant => {
        res.json(plant);
    })
    .catch( err => {
        next(new createError.InternalServerError(err.message));
    });

};

// Delete.
exports.delete = (req, res, next) => {
  return service.delete(req.params.id)
      .then( () => res.json({}) )
      .catch( err => {
          next(new createError.InternalServerError(err.message));
      } );
};
*/
