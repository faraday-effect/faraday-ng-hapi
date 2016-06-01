const course_prefix_name = 8;
const Joi = require('joi');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/courses',
        handler: function (request, reply) {
            var response = bookshelf.Courses.forge().fetch();
            reply(response);
        }
    });

    server.route({
        method: 'POST',
        path: '/courses',
        handler: function (request, reply) {
            new bookshelf.Course({
                title: request.payload.title,
                prefix_id: request.payload.prefix_id,
                number: request.payload.number,
                active: request.payload.active,
                department_id: request.payload.department_id
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
                    title: Joi.string(),
                    prefix_id: Joi.number().positive().integer().required(),
                    number: Joi.string().length(course_prefix_name).required(),
                    active: Joi.boolean().default(false),
                    department_id: Joi.number().positive().integer().required()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/courses/{course_id}',
        handler: function (request, reply) {
            var response = bookshelf.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
            console.log('I deleted');
            reply(response);
        },
        config: {
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/courses/{course_id}',
        handler: function (request, reply) {
            //let response = bookshelf.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch()
            var name = "not set";
            new bookshelf.Course({id: request.params.course_id}).fetch().then(function (model) {
                new bookshelf.Prefix({id: model.get('prefix_id')}).fetch().then(function (model2) {
                    name = model2.get('name');
                    model.set('prefix_name', name);
                    reply(model);
                });

            });
            //response.set('prefix', bookshelf.Prefix.forge().fetch(response.prefix_id));
            //reply(response);
        },
        config: {
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            },
            notes: 'Contains a course object appended with prefix_name: \'name\' with the prefix id\'s name'
        }
    });

    server.route({
        method: 'PUT',
        path: '/courses/{course_id}',
        handler: function (request, reply) {
            bookshelf.Course.forge({'id': request.params.course_id})
                .save(
                    {
                        title: request.payload.title,
                        prefix_id: request.payload.prefix_id,
                        number: request.payload.number,
                        active: request.payload.active,
                        department_id: request.payload.department_id
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
                    title: Joi.string(),
                    prefix_id: Joi.number().positive().integer().required(),
                    number: Joi.string().length(course_prefix_name).required(),
                    active: Joi.boolean().default(false),
                    department_id: Joi.number().positive().integer().required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/courses/{course_id}/sections',
        handler: function (request, reply) {
            var response = bookshelf.Section.where('course_id', request.params.course_id).fetch();
            reply(response);
        },
        config: {
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = {name: 'courses', version: '0.0.1'};