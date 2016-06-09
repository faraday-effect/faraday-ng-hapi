"use strict";

const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');
const Section = require('./../models/Section')
const Offering = require('./../models/Offering')
const Course = require('./../models/Course')
const ActualClass = require('./../models/ActualClass')

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/sections',
        handler: function (request, reply) {
            Section
            .query()
            .eager('offering.course.[prefix, department]')
            .then((sections) => {
                reply(sections);
            })
            .catch((err) => {
                return reply(Boom.notFound('Failed to retrieve all the sections', err));
            })
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/students',
        handler: function (request, reply) {
            new bookshelf.Student({ section_id: request.params.section_id, person_id: request.auth.credentials.id })
                .save()
                .then(function (model) {
                    return reply(model);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation('Failed to add student ' + request.auth.credentials.first_name + ' ' + request.auth.credentials.last_name + ' to section ' + request.params.section_id, err));
                });
        },
        config: {
            notes: 'adds a student to a given section does not handle the case of double adding a student to a section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/instructors',
        handler: function (request, reply) {
            new bookshelf.Instructor({ section_id: request.params.section_id, person_id: request.auth.credentials.id })
                .save()
                .then(function (model) {
                    return reply(model);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation('Failed to add student ' + request.auth.credentials.first_name + ' ' + request.auth.credentials.last_name, err));
                });
        },
        config: {
            notes: 'adds an instructor to a given section does not handle the case of double adding an instructor to a section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/tas',
        handler: function (request, reply) {
            new bookshelf.Teaching_Assistant({ section_id: request.params.section_id, person_id: request.auth.credentials.id })
                .save()
                .then(function (model) {
                    return reply(model);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation('Failed to add TA ' + request.auth.credentials.first_name + ' ' + request.auth.credentials.last_name, err));
                });
        },
        config: {
            notes: 'adds TA to a given section does not handle the case of double adding a TA to a section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
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
                    return reply(Boom.badRequest('Failed to create a new section', err));
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
                .eager('offering.course.[prefix, department]')
                .then((section) => {
                    reply(section);
                })
                .catch((err) => {
                    console.log(err.stack);
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
                    var response = []
                    students.forEach((student) => {
                        response.push(student.stripPassword());
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
            ActualClass
                .query()
                .insert({
                    start_time: new Date(),
                    section_id: request.params.section_id
                })
                .then((actualClass) => {
                    Section
                        .query()
                        .patchAndFetchById( actualClass.section_id, {
                            current_class: actualClass.id
                        })
                        .then(() => {
                            reply(actualClass);
                        });
                })
                .catch(function (err) {
                    return reply(Boom.badRequest('Failed to create a new actual class', err));
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
            bookshelf.Section.forge({ id: request.params.section_id })
                .current_class()
                .where({ 'stop_time': null })
                .save({
                    stop_time: new Date
                },
                { method: 'update', patch: true })
                .then((model) => {
                    bookshelf.Section
                        .forge({ id: request.params.section_id })
                        .save({
                            current_class: null
                        })
                        .then((newModel) => {
                            model.fetch().then((section) => {
                                reply(section);
                            }).catch((err) => {
                                return reply(Boom.badImplementation('Failed to end the class', err));
                            });
                        }).catch((err) => {
                            return reply(Boom.badImplementation('Failed to end the class', err));
                        });
                }).catch((err) => {
                    return reply(Boom.badData('This class has already ended', err));
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
            new bookshelf.Section({ id: request.params.section_id })
                .current_class()
                .where({ 'stop_time': null })
                .fetch()
                .then((model) => {
                    reply(model);
                })
                .catch((err) => {
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
            Section
                .query()
                .patchAndFetchById(request.params.section_id, {
                    offering_id: request.payload.offering_id,
                    reg_number: request.payload.reg_number,
                    title: request.payload.title
                })
                .then((updatedModel) => {
                    reply(updatedModel);
                })
                .catch(function (err) {
                    reply(Boom.badRequest('Failed to edit section ' + request.payload.section_id, err));
                });
        },
        config: {
            validate: {
                params: {
                    section_id: Joi.number().integer()
                },
                payload: {
                    offering_id: Joi.number().positive().integer().required(),
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
            notes: 'to be implemented',
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
