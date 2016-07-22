const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Boom = require('boom');
const saltRounds = 10;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {
            User
                .query()
                .then((users) => {
                    reply(users);              
                }).catch((err) => {
                    return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            auth: false,
            notes: 'returns all the user objects'
        }
    });

    server.route({
        method: 'GET',
        path: '/users/{user_id}',
        handler: function (request, reply) {
            User
                .query()
                .where('id', request.params.user_id)
                .first()    
                .then((user) => {
                    reply(user.stripPassword())
                }).catch(function (err) {
                    return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'returns a user given a valid user_id',
            validate: {
                params: {
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: function (request, reply) {
            var hash = bcrypt.hashSync(request.payload.password, saltRounds);
            User
                .query()
                .insert({
                    first_name: request.payload.first_name,
                    last_name: request.payload.last_name,
                    campus_id: request.payload.campus_id,
                    email: request.payload.email,
                    password: hash,
                    mobile_phone: request.payload.mobile_phone,
                    office_phone: request.payload.office_phone
                })
                .then((user) => {
                    user.stripPassword();
                    reply(user);
                }).catch((err) => {
                    return reply(Boom.badRequest('Failed to create a new user', err));
            });

        },
        config: {
            auth: false,
            notes: 'Creates a standard user',
            validate: {
                payload: {
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    campus_id: Joi.string(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required(),
                    mobile_phone: Joi.string().length(10),
                    office_phone: Joi.string().length(10)
                }
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/users/{user_id}/sections',
        handler: function (request, reply) {
            User
                .query()
                .findById(request.params.user_id)
                .then((user) => {
                    return user
                        .$relatedQuery('section')
                        // Load all the related data from the db into a JSON object
                        .eager('[relationshipType, sectionSchedule, sequence.offering.course.[prefix, department]]')
                        // Filter the relationshipType by user_id and section_id
                        .filterEager('relationshipType', builder => {
                            builder.where('user_id', request.params.user_id)
                        });
                }).then((user_sections) => {
                    reply(user_sections);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the sections for a given user from the database'
        }
    });

    next();
};

exports.register.attributes = {name: 'users', version: '0.0.4'};
