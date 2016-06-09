"use strict";

const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');
const Section = require('./../models/Section')
const Offering = require('./../models/Offering')
const Course = require('./../models/Course')

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/sections',
        handler: function (request, reply) {
            Section
            .query()
            .then((sections) => {
                reply(sections);
            })
            .catch((err) => {
                return reply(Boom.badImplementation('Failed to retrieve all the sections', err));
            })
        }
    });

    server.route({
        method: 'POST',
        path: '/sections',
        handler: function (request, reply) {
            Section
                .query()
                .insert({
                    offering_id: request.payload.offering_id,
                    reg_number: request.payload.reg_number,
                    title: request.payload.title
                })
                .then((section) => {
                    return reply(section);
                })
                .catch(function (err) {
                    return reply(Boom.badImplementation('Failed to create a new section', err));
                });
        },
        config: {
            validate: {
                payload: {
                    offering_id: Joi.number().positive().integer().required(),
                    reg_number: Joi.string().required(),
                    title: Joi.string()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    reply(section.$relatedQuery('offering'));
                })
                .catch((err) => {
                    return reply(Boom.notFound('Section ' + request.params.section_id + ' not found!', err));
                });
        },
        config: {
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}/students',
        handler: function (request, reply) {
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    return section.$relatedQuery('students');
                })
                .then((students) => {
                    var response = {}
                    students.forEach((student) => {
                        response[student.email] = {'id': student.id, 'first_name': student.first_name, 'last_name': student.last_name}
                    });
                    return reply(response);
                });
        },
        config: {
            notes: 'returns a list of students for a given class',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/today',
        handler: function (request, reply) {
            new bookshelf.Actual_Class({
                date: new Date(),
                section_id: request.params.section_id
            })
                .save().then(function (newModel) {
                    reply(newModel)
                }).catch(function (err) {
                    return reply(Boom.badImplementation('Failed to create a new actual class', err));
                });
        },
        config: {
            notes: 'when the prof hit the \'start class button\'this will start class by creating an actaul class instance allowing students to attend the class',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

        server.route({
        method: 'DELETE',
        path: '/sections/{section_id}/today',
        handler: function (request, reply) {
            bookshelf.Section.forge({ 'id': request.params.section_id })
                .save(
                {
                    current_class: null
                }
                ).then(function (model) {
                    reply(model)
                }).catch(function (err) {
                    return reply(Boom.badImplementation('Could not end the class', err));
                });
        },
        config: {
            notes: 'to be implemented - should remove current_class from section and place the end time on actual class',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

        server.route({
            method: 'GET',
            path: '/sections/{section_id}/today',
            handler: function (request, reply) {
                bookshelf.Actual_Class.forge({ section_id: request.params.section_id, date: new Date() }).fetch().then((model) => {
                    reply(model);
                }).catch((err) => {
                    return reply(Boom.badData('Your professor has not started class yet'))
                });
            },
            config: {
                notes: 'returns the actual class ID for today\'s date when given a section id',
                validate: {
                    params: {
                        section_id: Joi.number().positive().integer()
                    }
                }
            }
        });

    server.route({
        method: 'PUT',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            bookshelf.Section.forge({ 'id': request.params.section_id })
                .save(
                {
                    course_id: request.payload.course_id,
                    term_id: request.payload.term_id,
                    reg_number: request.payload.reg_number,
                    title: request.payload.title
                }
                ).then(function (model) {
                    reply(model)
                }).catch(function (err) {
                    return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
                });
        },
        config: {
            validate: {
                params: {
                    section_id: Joi.number().integer()
                },
                payload: {
                    course_id: Joi.number().positive().integer().required(),
                    term_id: Joi.number().positive().integer().required(),
                    reg_number: Joi.string().required(),
                    title: Joi.string()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            var response = bookshelf.Section.forge({ 'id': encodeURIComponent(request.params.section_id) }).fetch();
            console.log('I deleted');
            reply(response);
        },
        config: {
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = { name: 'sections', version: '0.0.1' };
