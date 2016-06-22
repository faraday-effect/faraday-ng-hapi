const course_prefix_name = 3;
const Joi = require('joi');
const Boom = require('boom');

const Prefix = require('../models/Prefix');
const Department = require('../models/Department');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/prefixes',
        handler: function (request, reply) {
            Prefix
                .query()
                .then((prefixes) => {
                    reply(prefixes);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the prefixes from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/prefixes/{prefix_id}',
        handler: function (request, reply) {
            Prefix
                .query()
                .where('id', request.params.prefix_id)
                .first()
                .then((prefix) => {
                    if (prefix)
                        reply(prefix);
                    else
                        reply(Boom.notFound('Prefix ID ' + request.params.prefix_id + ' was not found!'))
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
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
        method: 'POST',
        path: '/prefixes',
        handler: function (request, reply) {
            Prefix
                .query()
                .insert({
                    name: request.payload.name
                })
                .then((prefix) => {
                    reply(prefix);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
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
            Prefix
                .query()
                .patchAndFetchById(request.params.prefix_id, {
                    name: request.payload.name
                })
                .then((prefix) => {
                    reply(prefix);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
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
        path: '/departments',
        handler: function (request, reply) {
            Department
                .query()
                .then((department) => {
                    reply(department);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the departments from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/departments/{department_id}',
        handler: function (request, reply) {
            Department
                .query()
                .where('id', request.params.department_id)
                .first()
                .then((department) => {
                    if (department)
                        reply(department);
                    else
                        reply(Boom.notFound('Department ID ' + request.params.department_id + ' was not found!'));
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
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
            Department
                .query()
                .where('id', request.params.department_id)
                .eager('prefix')
                .first()
                .then((department) => {
                    if(department)
                        reply(department);
                    else
                        reply(Boom.notFound('Department ID ' + request.params.department_id + ' was not found!'))
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
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
        path: '/departments/{department_id}/prefixes/{prefix_id}',
        handler: function (request, reply) {
            Department
                .query()
                .where('id', request.params.department_id)
                .first()
                .then((department) => {
                    return department
                        .$relatedQuery('prefix')
                        .relate(request.params.prefix_id);
                })
                .then((response) => {
                    Department
                        .query()
                        .where('id', request.params.department_id)
                        .eager('prefix')
                        .first()
                        .then((department) => {
                            reply(department)
                        });
                })
                .catch((err) => {
                    reply(Boom.badRequest('Could not associate department ID ' + request.params.department_id + ' with prefix ID ' + request.params.prefix_id));
                });
        },
        config: {
            notes: 'Associates a department_id with a prefix_id',
            validate: {
                params: {
                    department_id: Joi.number().positive().integer(),
                    prefix_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/departments',
        handler: function (request, reply) {
            Department
                .query()
                .insert({
                    name: request.payload.name
                })
                .then((department) => {
                    reply(department);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
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
            Department
                .query()
                .patchAndFetchById(request.params.department_id, {
                    name: request.payload.name
                })
                .then((department) => {
                    reply(department);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'updates a department given a department_id',
            validate: {
                params: {
                    department_id: Joi.number().positive().integer()
                },
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    });

    next();
};

exports.register.attributes = { name: 'departments', version: '0.0.2' };