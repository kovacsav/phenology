const express = require('express');
const createError = require('http-errors');
const jwt = require("jsonwebtoken");

const currentModel = require('../../models/user.model');
const currentService = require('./service');
const register = require('../../auth/register');

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



// Create.
module.exports.create = (req, res, next) => {
    if (!checkModel(currentModel, req.body, next)) {
        console.log("checkModel hibát talált");
        return;
    };
/*
    if (currentService.findOne(req.body.email)){
        return (new createError.ServiceUnavailable("Ezzel az email címmel már regisztráltak."));
    };
*/
    return currentService.create(req.body)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        // Send confirmation email
        .then(register.sendEmail(
            req.body.firstName + " " + req.body.lastName,
            req.body.email,
            // set confrimation code
            jwt.sign({ email: req.body.email },
                process.env.SECRET)))
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
