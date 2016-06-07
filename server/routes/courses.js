const course_prefix_name = 8;
const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');

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
                hidden: request.payload.hidden,
                department_id: request.payload.department_id
            })
                .save().then(function (model) {
                reply(model)
            }).catch(function (err) {
                return reply(Boom.badImplementation('Failed to create a new course', err));
            });
        },
        config: {
            notes: 'creates a new course with the given information',
            validate: {
                payload: {
                    title: Joi.string(),
                    prefix_id: Joi.number().positive().integer().required(),
                    number: Joi.string().length(course_prefix_name).required(),
                    hidden: Joi.boolean().default(false),
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
            notes: 'to be implemented',
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
            var name = "not set";
            new bookshelf.Course({id: request.params.course_id}).fetch().then(function (model) {
                new bookshelf.Prefix({id: model.get('prefix_id')}).fetch().then(function (model2) {
                    name = model2.get('name');
                    model.set('prefix_name', name);
                    reply(model);
                });

            });
        },
        config: {
            notes: 'Contains a course object appended with prefix_name: \'name\' with the prefix id\'s name',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            }
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
                        hidden: request.payload.hidden,
                        department_id: request.payload.department_id
                    }
                ).then(function (model) {
                reply(model)
            }).catch(function (err) {
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
            });
        },
        config: {
            notes: 'Updates a course with the given information provided by the course_id',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                },
                payload: {
                    title: Joi.string(),
                    prefix_id: Joi.number().positive().integer().required(),
                    number: Joi.string().length(course_prefix_name).required(),
                    hidden: Joi.boolean().default(false),
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
            notes: 'broken - to be re-implemented',
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