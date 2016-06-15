const course_prefix_name = 8;
const Joi = require('joi');
const bookshelf = require('../bookshelf');
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


    server.route({
        method: 'GET',
        path: '/departments',
        handler: function (request, reply) {
            var response = bookshelf.Departments.forge().fetch();
            reply(response);
        }
    });

    server.route({
        method: 'GET',
        path: '/departments/{department_id}',
        handler: function (request, reply) {
            var response = bookshelf.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
            reply(response);
        },
        config: {
            notes: 'returns a department name given a department_id',
            validate: {
                params: {
                    department_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/departments/{department_id}/prefixes',
        handler: function (request, reply) {
            new bookshelf.Department({id: request.params.department_id}).fetch().then(function (model) {
                new bookshelf.Department_Prefix().where({department_id: request.params.department_id}).fetchAll().then(model2 => {
                    var responseJSON = {
                        id: model.get('id'),
                        name: model.get('name'),
                        prefixes: model2
                    };
                    reply(responseJSON);
                }).catch((err) => {
                    return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
                });
            }).catch((err) => {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'returns the prefixes in an array and department name for a given department_id',
            validate: {
                params: {
                    department_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/departments',
        handler: function (request, reply) {
            new bookshelf.Department({
                name: request.payload.name
            })
                .save().then(function (model) {
                reply(model)
            }).catch(function (err) {
                return reply(Boom.badImplementation('Failed to create a new department', err));
            });
        },
        config: {
            notes: 'creates a new department',
            validate: {
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/departments/{department_id}',
        handler: function (request, reply) {
            bookshelf.Department.forge({'id': request.params.department_id})
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
            notes: 'updates a department given a department_id',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                },
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/departments/{department_id}',
        handler: function (request, reply) {
            var response = bookshelf.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
            console.log('I deleted');
            reply(response);
        },
        config: {
            notes: 'to be implemented',
            validate: {
                params: {
                    department_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = {name: 'departments', version: '0.0.1'};