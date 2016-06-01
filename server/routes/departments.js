const Joi = require('joi');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {
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
                });
            });
        },
        config: {
            validate: {
                params: {
                    department_id: Joi.number().positive().integer()
                }
            },
            notes: 'returns the prefixes in an array and department name for a given department_id'
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
                //get database
                reply({statusCode: 200, method: "post", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
            });
        },
        config: {
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
                //get database
                reply({statusCode: 200, method: "put", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
            });
        },
        config: {
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