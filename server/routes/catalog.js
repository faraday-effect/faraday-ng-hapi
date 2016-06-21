const course_prefix_name = 3;
const Joi = require('joi');
const Boom = require('boom');

const Course = require('../models/Course');
const Section = require('../models/Section');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/courses',
        handler: function (request, reply) {
            Course
                .query()
                .eager('[prefix, department, section.sectionSchedule]')
                .then((courses) => {
                    reply(courses);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the courses from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/courses/{course_id}',
        handler: function (request, reply) {
            Course
                .query()
                .where('id', request.params.course_id)
                .eager('[prefix, department, section.sectionSchedule]')
                .first()
                .then((course) => {
                    if(course)
                        reply(course);
                    else
                        reply(Boom.notFound('Course ID ' + request.params.course_id + ' was not found!'));
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Contains a course object with all related information',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/courses',
        handler: function (request, reply) {
            Course
                .query()
                .insert({
                    title: request.payload.title,
                    number: request.payload.number,
                    hidden: request.payload.hidden,
                    prefix_id: request.payload.prefix_id,
                    department_id: request.payload.department_id
                })
                .then((course) => {
                    reply(course);
                })
                .catch((err) => {
                    reply(Boom.badRequest(err));
                });
        },
        config: {
            notes: 'creates a new course with the given information',
            validate: {
                payload: {
                    title: Joi.string().max(255),
                    number: Joi.string().length(course_prefix_name).required(),
                    hidden: Joi.boolean().default(false),
                    prefix_id: Joi.number().positive().integer().required(),
                    department_id: Joi.number().positive().integer().required()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/courses/{course_id}',
        handler: function (request, reply) {
            Course
                .query()
                .patchAndFetchById(request.params.course_id, {
                    title: request.payload.title,
                    number: request.payload.number,
                    hidden: request.payload.hidden,
                    prefix_id: request.payload.prefix_id,
                    department_id: request.payload.department_id
                })
                .then((course) => {
                    reply(course);
                })
                .catch((err) => {
                    reply(Boom.badRequest(err));
                });
        },
        config: {
            notes: 'Updates a course_id with the given information',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                },
                payload: {
                    title: Joi.string().max(255),
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
            Section
                .query()
                .where('course_id', request.params.course_id)
                .eager('sectionSchedule')
                .then((sections) => {
                    reply(sections);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                })
        },
        config: {
            notes: 'retrieves the section objects for a given course object',
            validate: {
                params: {
                    course_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = {name: 'catalog', version: '0.0.2'};