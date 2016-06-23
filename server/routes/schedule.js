'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Section = require('../models/Section');
const User = require('../models/User');
const Term = require('../models/Term');
const RelationshipType = require('../models/RelationshipType');
const UserRelationship = require('../models/UserRelationship');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/terms',
        handler: function (request, reply) {
            Term
                .query()
                .then((terms) => {
                    reply(terms);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the terms from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/terms/{term_id}',
        handler: function (request, reply) {
            Term
                .query()
                .where('id', request.params.term_id)
                .first()
                .then((terms) => {
                    if (terms != null)
                        reply(terms);
                    else
                        reply(Boom.notFound('Term ID ' + request.params.term_id + ' was not found!'))
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'returns the term information for a given term_id',
            validate: {
                params: {
                    term_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/terms',
        handler: function (request, reply) {
            Term
                .query()
                .insert({
                    name: request.payload.name,
                    start_date: request.payload.start_date,
                    end_date: request.payload.end_date
                })
                .then((newTerm) => {
                    reply(newTerm);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'creates a new term',
            validate: {
                payload: {
                    name: Joi.string().required(),
                    start_date: Joi.date().format('YYYY-MM-DD').required(),
                    end_date: Joi.date().format('YYYY-MM-DD').required()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/terms/{term_id}',
        handler: function (request, reply) {
            Term
                .query()
                .patchAndFetchById(request.params.term_id, {
                    name: request.payload.name,
                    start_date: request.payload.start_date,
                    end_date: request.payload.end_date
                })
                .then((newTerm) => {
                    reply(newTerm);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Updates the term information for a given term_id',
            validate: {
                params: {
                    term_id: Joi.number().positive().integer()
                },
                payload: {
                    name: Joi.string().required(),
                    start_date: Joi.date().format('YYYY-MM-DD').required(),
                    end_date: Joi.date().format('YYYY-MM-DD').required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections',
        handler: function (request, reply) {
            User
                .query()
                .where('id', request.auth.credentials.id)
                .first()
                .then((user) => {
                    return user
                        .$relatedQuery('section')
                        // Load all the related data from the db into a JSON object
                        .eager('[userRelationship.relationshipType, sectionSchedule, sequence.offering.course.[prefix, department]]')
                        // Filter the userRelationship by user_id and section_id
                        .filterEager('userRelationship', builder => {
                            builder.where('user_id', request.auth.credentials.id)
                        });
                }).then((user_sections) => {
                    reply(user_sections);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
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
                .eager('[userRelationship.relationshipType, sectionSchedule, sequence.offering.course.[prefix, department]]')
                .filterEager('userRelationship', builder => {
                    builder.where('user_id', request.auth.credentials.id)
                })
                .then((section) => {
                    if (section)
                        reply(section);
                    else
                        reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'))
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
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
        method: 'POST',
        path: '/sections',
        handler: function (request, reply) {
            Section
                .query()
                .insert({
                    sequence_id: request.payload.sequence_id,
                    course_id: request.payload.course_id,
                    term_id: request.payload.term_id,
                    credit_hours: request.payload.credit_hours,
                    reg_number: request.payload.reg_number,
                    title: request.payload.title
                })
                .then((section) => {
                    return reply(section);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            validate: {
                payload: {
                    sequence_id: Joi.number().positive().integer().required(),
                    course_id: Joi.number().positive().integer().required(),
                    term_id: Joi.number().positive().integer().required(),
                    credit_hours: Joi.number().positive().integer().required(),
                    reg_number: Joi.string().required(),
                    title: Joi.string()
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
                    sequence_id: request.payload.offering_id,
                    course_id: request.payload.course_id,
                    term_id: request.payload.term_id,
                    credit_hours: request.payload.credit_hours,
                    reg_number: request.payload.reg_number,
                    title: request.payload.title
                })
                .then((updatedModel) => {
                    reply(updatedModel);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            validate: {
                params: {
                    section_id: Joi.number().integer()
                },
                payload: {
                    sequence_id: Joi.number().positive().integer().required(),
                    course_id: Joi.number().positive().integer().required(),
                    term_id: Joi.number().positive().integer().required(),
                    credit_hours: Joi.number().positive().integer().required(),
                    reg_number: Joi.string().required(),
                    title: Joi.string()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/enroll',
        handler: function (request, reply) {
            var hasPreviousRelationship = null;
            //Get any of the previous relationships
            UserRelationship
                .query()
                .where('section_id', request.params.section_id)
                .andWhere('user_id', request.auth.credentials.id)
                .first()
                .then((userRelationship) => {
                    hasPreviousRelationship = userRelationship;
                });

            RelationshipType
                .query()
                .where('title', 'student')
                .first()
                .then((relationshipType) => {
                    User
                        .query()
                        .where('id', request.auth.credentials.id)
                        .first()
                        .then((user) => {
                            if(!hasPreviousRelationship){
                                return user
                                    .$relatedQuery('section')
                                    .relate({
                                        id: request.params.section_id,
                                        relationship_type_id: relationshipType.id
                                    });
                            } else {
                                return reply(Boom.badRequest(`You are already enrolled in section ID ${request.params.section_id}`));
                            }
                        })
                        .then((newUserRelation) => {
                            if(newUserRelation.id == request.params.section_id){
                                newUserRelation.user_id = request.auth.credentials.id;
                                return reply(newUserRelation);
                            }
                        })
                        .catch(function (err) {
                            reply(Boom.badImplementation(err));
                        });
                });
        },
        config: {
            notes: 'Allows a student to self-enroll into a given section_id, prevents against double enrolling in the same section',
            validate: {
                params: {
                    section_id: Joi.number().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = { name: 'schedule', version: '0.0.4' };
