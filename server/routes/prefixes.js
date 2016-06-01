const course_prefix_name = 8;
const Joi = require('joi');
const bookshelf = require('./../bookshelf');

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
                //get database
                reply({statusCode: 200, method: "post", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
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
                //get database
                reply({statusCode: 200, method: "put", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
            });
        },
        config: {
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