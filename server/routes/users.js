const Joi = require('joi');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {
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

    next();
};

exports.register.attributes = {name: 'users', version: '0.0.1'};