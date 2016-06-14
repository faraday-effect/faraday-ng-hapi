"use strict";

const Joi = require('joi');
const Boom = require('boom');
const Section = require('./../models/Section')
const Offering = require('./../models/Offering')
const Course = require('./../models/Course')
const ActualClass = require('./../models/ActualClass')
const CurrentClass = require('./../models/CurrentClass')

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
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    section.$relatedQuery('student').relate(request.auth.credentials.id)
                    .then((student) => {
                        reply(student);
                    })
                    .catch((err) => {
                        reply(Boom.badData('Could not add current_user as student to section ' + request.params.section_id, err));
                    })
                })
                .catch((err) => {
                reply(Boom.badData('Could not find section ' + request.params.section_id, err));    
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
           Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    section.$relatedQuery('instructor').relate(request.auth.credentials.id)
                    .then((instructor) => {
                        reply(instructor);
                    })
                    .catch((err) => {
                        reply(Boom.badData('Could not add current_user as instructor to section ' + request.params.section_id, err));
                    })
                })
                .catch((err) => {
                reply(Boom.badData('Could not find section ' + request.params.section_id, err));    
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
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    section.$relatedQuery('teaching_assistant').relate(request.auth.credentials.id)
                    .then((ta) => {
                        reply(ta);
                    })
                    .catch((err) => {
                        reply(Boom.badData('Could not add current_user as TA to section ' + request.params.section_id, err));
                    })
                })
                .catch((err) => {
                reply(Boom.badData('Could not find section ' + request.params.section_id, err));    
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
        path: '/sections/{section_id}/members',
        handler: function (request, reply) {
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .eager('users')
                .then((section) => {
                    section.users.forEach((user) => {
                        user.stripPassword();
                    });
                    reply(section);
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
                .then((actual_class) => {
                    actual_class
                    .$relatedQuery('currentClass')
                    .relate(request.params.section_id)
                    .then(() => {
                        reply(actual_class);
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
            var actual_class_id = -1;
            //Get the current_class from the database
            Section
                .query()
                .select('current_class')
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    actual_class_id = section.current_class
                }).then((section) => {
                    //Update current_class to be null
                    Section
                        .query()
                        .where('id', request.params.section_id)
                        .patch({ current_class: null })
                        .then((section) => {

                        }).then((section) => {
                            //Update actual_class to have a stop_time    
                            ActualClass
                                .query()
                                .patchAndFetchById(actual_class_id, {
                                    stop_time: new Date
                                }).then((updatedModel) => {
                                    if(updatedModel == 0)
                                        return reply({statusCode: 204, message: 'Class has already ended!'});
                                    reply(updatedModel)
                                });

                        });

                });


        },
        config: {
            notes: 'should remove current_class from section and place the end time on actual class',
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
            ActualClass
                .query()
                .select('id', 'start_time', 'section_id')
                .where('section_id', request.params.section_id)
                .andWhere('stop_time', null)
                .first()
                .then((section) => {
                    if(section == null)
                        return reply({statusCode: 200, message: 'Your professor has not started class yet'});
                    reply(section);
                })
                .catch((err) => {
                    return reply(Boom.badRequest('Your professor has not started class yet'))
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
                    reply(Boom.badData('Failed to edit section ' + request.payload.section_id, err));
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
            reply('I am not implemented');
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

exports.register.attributes = { name: 'sections', version: '0.0.3' };
