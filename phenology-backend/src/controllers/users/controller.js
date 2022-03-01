const express = require('express');
const createError = require('http-errors');

const currentModel = require('../../models/user.model');
const currentService = require('./service');

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


// Send confirmation email
module.exports.sendConfirmationEmail = (req, res, next) => {
    if (!checkModel(currentModel, req.body, next)) {
        return;
    }

    if (currentService.findOne(req.params.email)){
        return (new createError.ServiceUnavailable("Ezzel az email címmel már regisztráltak."));
    }
    
    return;
};

// Create.
module.exports.create = (req, res, next) => {
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

// Read.
module.exports.findAll = (req, res, next) => {
    return currentService.findAll()
        .then( items => {
            res.json(items);
        });
};

// Read one.
module.exports.findOne = (req, res, next) => {
    return currentService.findOne(req.params.id)
        .then( item => {
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

    return currentService.update(req.params.id, req.body)
        .then(item => {
            res.json(item);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

// Delete.
module.exports.delete = (req, res, next) => {
    return currentService.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        } );
};
