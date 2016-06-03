const Joi = require('joi');
const bcrypt = require('bcrypt');
const bookshelf = require('./../bookshelf');
const saltRounds = 10;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {
            bookshelf.Person.fetchAll().then((Collection) => {
                reply(Collection);
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
            }).catch(function (error) {
                reply({err: error});
            });
        },
        config: {
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
            }).catch(function (error) {
                reply({err: error});
            });
        },
        config: {
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
            }).catch(function (error) {
                reply({err: error});
            });
        },
        config: {
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
            }).catch(function (error) {
                reply({err: error});
            });
        },
        config: {
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
                password: hash
            }).save().then((model) => {
                responseJSON = model.toJSON();
                delete responseJSON['password'];
                reply(responseJSON);
            }).catch((err) => {
                reply(err)
            });

        },
        config: {
            auth: false,
            validate: {
                payload: {
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required()
                }
            }
        }
    });

    next();
};

exports.register.attributes = {name: 'users', version: '0.0.1'};