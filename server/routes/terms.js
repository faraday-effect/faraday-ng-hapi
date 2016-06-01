const Joi = require('joi');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/terms',
        handler: function (request, reply) {
            var response = bookshelf.Terms.forge().fetch();
            reply(response);
        }
    });

    server.route({
        method: 'POST',
        path: '/terms',
        handler: function (request, reply) {
            new bookshelf.Term({
                name: request.payload.name,
                start_date: request.payload.start_date,
                end_date: request.payload.end_date
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
                    name: Joi.string().required(),
                    start_date: Joi.date().format('YYYY/MM/DD').required(),
                    end_date: Joi.date().format('YYYY/MM/DD').required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/terms/{term_id}',
        handler: function (request, reply) {
            var response = bookshelf.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
            reply(response);
        },
        config: {
            validate: {
                params: {
                    term_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/terms/{term_id}',
        handler: function (request, reply) {
            bookshelf.Term.forge({'id': request.params.term_id})
                .save(
                    {
                        name: request.payload.name,
                        start_date: request.payload.start_date,
                        end_date: request.payload.end_date
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
                    term_id: Joi.number().positive().integer()
                },
                payload: {
                    name: Joi.string().required(),
                    start_date: Joi.date().format('YYYY/MM/DD').required(),
                    end_date: Joi.date().format('YYYY/MM/DD').required()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/terms/{term_id}',
        handler: function (request, reply) {
            var response = bookshelf.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
            console.log('I deleted');
            reply(response);
        },
        config: {
            validate: {
                params: {
                    term_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = {name: 'terms', version: '0.0.1'};