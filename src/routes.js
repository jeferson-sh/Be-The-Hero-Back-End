const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController.js');
const IncidentController = require('./controllers/IncidentController.js');
const ProfileController = require('./controllers/ProfilesController.js');
const SessioController = require('./controllers/SessionController.js');

const routes = express.Router();


/**
 * Post Session route
 */
routes.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}),SessioController.create);

/**
 * Get Profile route
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index);

/**
 * Get Ongs
 */
routes.get('/ongs', OngController.index);

/**
 * Post Ongs
 */
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(12).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

/**
 * Get Incidents
 */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.index);

/**
 * Post Incidents
 */
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}) ,IncidentController.create);

/**
 * Delete Incidents
 */
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete);


module.exports = routes;