const Joi = require('joi');
const bcrypt = require('bcrypt');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');
const saltRounds = 10;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {
            bookshelf.Person.fetchAll().then((Collection) => {
                reply(Collection);
            }).catch((err) => {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            auth: false,
            notes: 'returns all the Person objects'
        }
    });

    server.route({
        method: 'GET',
        path: '/students/{user_id}/sections',
        handler: function (request, reply) {
            //check session token with {user_id} return error if dif
            bookshelf.Person.where({id: request.params.user_id}).fetch({withRelated: ['sections_enrolled']}).then((model) => {
                reply(model);
            }).catch(function (err) {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'returns user objects who are students and with what sections they are students of',
            validate: {
                params: {
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/instructors/{user_id}/sections',
        handler: function (request, reply) {
            //check session token with {user_id} return error if dif
            bookshelf.Person.where({id: request.params.user_id}).fetch({withRelated: ['sections_taught']}).then((model) => {
                reply(model);
            }).catch(function (err) {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'returns users objects who are instructors and with what sections they are instructors of',
            validate: {
                params: {
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/ta/{user_id}/sections',
        handler: function (request, reply) {
            //check session token with {user_id} return error if dif
            bookshelf.Person.where({id: request.params.user_id}).fetch({withRelated: ['sections_ta']}).then((model) => {
                reply(model);
            }).catch(function (err) {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'returns users objects who are TAs and with what sections they TA',
            validate: {
                params: {
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/users/{user_id}',
        handler: function (request, reply) {
            bookshelf.Person.where({id: request.params.user_id}).fetch().then((model) => {
                reply(model)
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
            var responseJSON = {};
            new bookshelf.Person({
                first_name: request.payload.first_name,
                last_name: request.payload.last_name,
                email: request.payload.email,
                password: hash,
                mobile_phone: request.payload.mobile_phone,
                office_phone: request.payload.office_phone
            }).save().then((model) => {
                responseJSON = model.toJSON();
                delete responseJSON['password'];
                reply(responseJSON);
            }).catch((err) => {
                return reply(Boom.badImplementation('Failed to create a new user', err));
            });

        },
        config: {
            auth: false,
            notes: 'Creates a standard user',
            validate: {
                payload: {
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required(),
                    mobile_phone: Joi.string().length(10),
                    office_phone: Joi.string().length(10)
                }
            }
        }
    });

    next();
};

exports.register.attributes = {name: 'users', version: '0.0.1'};
