"use strict";

const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const Boom = require('boom');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/sections',
        handler: function (request, reply) {
            var response = bookshelf.Sections.forge().fetch();
            reply(response);
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
            new bookshelf.Section({
                title: request.payload.title,
                reg_number: request.payload.reg_number,
                course_id: request.payload.course_id,
                term_id: request.payload.term_id
            })
                .save().then(function (model) {
                    reply(model)
                }).catch(function (err) {
                    return reply(Boom.badImplementation('Failed to create a new section', err));
                });
        },
        config: {
            validate: {
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
        method: 'GET',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            var name = 'not set';
            var responseJSON = {};
            bookshelf.Section.where({ id: request.params.section_id }).fetch().then(function (model) {
                bookshelf.Offering.where({ id: model.get('offering_id') }).fetch().then(function (model2) {
                    bookshelf.Course.where({ id: model2.get('course_id') }).fetch().then(model3 => {
                        bookshelf.Prefix.where({ id: model3.get('prefix_id') }).fetch().then(function (model4) {
                            name = model4.get('name');
                            responseJSON = model.toJSON();
                            responseJSON['course'] = model3.toJSON();
                            responseJSON['course']['prefix_name'] = name;
                            reply(responseJSON);
                        });
                    });
                });
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
            new bookshelf.Section({ id: request.params.section_id })
                .students()
                .fetch()
                .then(function (collection) {
                    return reply(collection.toJSON());
                })
                .catch(function (err) {
                    reply(Boom.badImplementation('Failed to fetch students', err));
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
                start_time: new Date(),
                section_id: request.params.section_id
            })
                .save().then(function (newModel) {
                    bookshelf.Section.forge({ id: request.params.section_id }).save({
                        current_class: newModel.get('id')
                    })
                        .then(() => {
                            reply(newModel)
                        }).catch(function (err) {
                            return reply(Boom.badImplementation('Failed to create a new actual class', err));
                        });
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
