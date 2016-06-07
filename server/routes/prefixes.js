const course_prefix_name = 8;
const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/prefixes',
        handler: function (request, reply) {
            var response = bookshelf.Prefixes.forge().fetch();
            reply(response);
        }
    });

    server.route({
        method: 'POST',
        path: '/prefixes',
        handler: function (request, reply) {
            new bookshelf.Prefix({
                name: request.payload.name
            })
                .save().then(function (model) {
                reply(model)
            }).catch(function (err) {
                return reply(Boom.badImplementation('Failed to create a new prefix', err));
            });
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().length(course_prefix_name).required()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/prefixes/{prefix_id}',
        handler: function (request, reply) {
            bookshelf.Prefix.forge({'id': request.params.prefix_id})
                .save(
                    {
                        name: request.payload.name
                    }
                ).then(function (model) {
                reply(model)
            }).catch(function (err) {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'Updates a prefix given a prefix_id',
            validate: {
                params: {
                    prefix_id: Joi.number().positive().integer()
                },
                payload: {
                    name: Joi.string().length(course_prefix_name).required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/prefixes/{prefix_id}',
        handler: function (request, reply) {
            var response = bookshelf.Prefix.forge({'id': encodeURIComponent(request.params.prefix_id)}).fetch();
            reply(response);
        },
        config: {
            notes: 'Returns a prefix name given a prefix_id',
            validate: {
                params: {
                    prefix_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/prefixes/{prefix_id}',
        handler: function (request, reply) {
            var response = bookshelf.Prefix.forge({'id': encodeURIComponent(request.params.prefix_id)}).fetch();
            console.log('I deleted');
            reply(response);
        },
        config: {
            notes: 'to be implemented',
            validate: {
                params: {
                    prefix_id: Joi.number().positive().integer()
                }
            }
        }
    });

    next();
};

exports.register.attributes = {name: 'prefixes', version: '0.0.1'};