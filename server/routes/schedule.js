'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Section = require('../models/Section');
const User = require('../models/User');
const Term = require('../models/Term');
const RelationshipType = require('../models/RelationshipType');
const Offering = require('../models/Offering');
const UserSection = require('../models/UserSection');

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
                        .eager('[relationshipType, sectionSchedule, sequence.offering.course.[prefix, department]]')
                        // Filter the relationshipType by user_id and section_id
                        .filterEager('relationshipType', builder => {
                            builder.where('user_id', request.auth.credentials.id)
                        });
                }).then((user_sections) => {
                    reply(user_sections);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the sections for a given user from the database'
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
                .eager('[relationshipType, sectionSchedule, sequence.offering.course.[prefix, department]]')
                .filterEager('relationshipType', builder => {
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
            notes: 'retrieves a given section and all related information from the database',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}/instructors',
        handler: function (request, reply) {
            var sectionSeq = null;
            RelationshipType
                .query()
                .where('title', 'instructor')
                .first()
                .then((rt) => {
                    Section
                        .query()
                        .where('id', request.params.section_id)
                        .eager('sequence')
                        .first()
                        .then((section) => {
                            sectionSeq = section.sequence;
                            return section
                                .$relatedQuery('userRelationship')
                                .pluck('user_id')
                                .where('relationship_type_id', rt.id)
                        })
                        .then((output) => {
                            if (output.length == 0) {
                                Offering
                                    .query()
                                    .where('id', sectionSeq.offering_id)
                                    .first()
                                    .then((section) => {
                                        sectionSeq = section.sequence;
                                        return section
                                            .$relatedQuery('userRelationship')
                                            .pluck('user_id')
                                            .where('relationship_type_id', rt.id)
                                    })
                                    .then((op) => {
                                        User
                                            .query()
                                            .whereIn('id', op)
                                            .then((users) => {
                                                for (var i = 0; i < users.length; i++) {
                                                    users[i].stripPassword();
                                                }
                                                reply(users);
                                            });
                                    });
                                return;
                            } else {
                                User
                                    .query()
                                    .whereIn('id', output)
                                    .then((users) => {
                                        for (var i = 0; i < users.length; i++) {
                                            users[i].stripPassword();
                                        }
                                        reply(users);
                                    });
                            }
                        })
                });

        },
        config: {
            notes: 'retrieves the professors for a given section ID even if the professor is tied only to the offering',
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
                    section_id: Joi.number().positive().integer()
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
            UserSection
                .query()
                .where('user_id', request.auth.credentials.id)
                .andWhere('section_id', request.params.section_id)
                .first()
                .then((userSection) => {
                    //set previous relationship to a larger var scope
                    hasPreviousRelationship = userSection;
                });

            //Get the relationship type object for a student
            RelationshipType
                .query()
                .where('title', 'student')
                .first()
                .then((relationshipType) => {
                    //Get the user object based on the current_user credentials
                    User
                        .query()
                        .where('id', request.auth.credentials.id)
                        .first()
                        .then((user) => {
                            //if they have a relationship already, error out, else make the relationship
                            //between section and the user ID with the relationshipType of student
                            console.log(!hasPreviousRelationship);
                            if (!hasPreviousRelationship) {
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
                        //if it makes the new row, send it back to the client
                        .then((newUserRelation) => {
                            if (newUserRelation.id == request.params.section_id) {
                                newUserRelation.user_id = request.auth.credentials.id;
                                return reply(newUserRelation);
                            }
                        })
                        .catch((err) => {
                            return reply(Boom.notFound(`Section ID ${request.params.section_id} was not found!`));
                        });
                });
        },
        config: {
            notes: 'Allows a student to self-enroll into a given section_id, prevents against double enrolling in the same section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/users/{user_id}/enroll',
        handler: function (request, reply) {
            var hasPreviousRelationship = null;
            //Get any of the previous relationships
            UserSection
                .query()
                .where('section_id', request.params.section_id)
                .andWhere('user_id', request.params.user_id)
                .first()
                .then((userSection) => {
                    //set previous relationship to a larger var scope
                    hasPreviousRelationship = userSection;
                });

            //Get the relationship type object for a student
            RelationshipType
                .query()
                .where('title', 'student')
                .first()
                .then((relationshipType) => {
                    //Get the user object based on the current_user credentials
                    User
                        .query()
                        .where('id', request.params.user_id)
                        .first()
                        .then((user) => {
                            //if they have a relationship already, error out, else make the relationship
                            //between section and the user ID with the relationshipType of student
                            if (!hasPreviousRelationship) {
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
                        //if it makes the new row, send it back to the client
                        .then((newUserRelation) => {
                            if (newUserRelation.id == request.params.section_id) {
                                newUserRelation.user_id = request.params.user_id;
                                return reply(newUserRelation);
                            }
                        })
                        .catch((err) => {
                            //check to see if the error was caused by an invalid section_id or user_id
                            if (err.constraint == 'user_section_section_id_foreign')
                                reply(Boom.notFound(`Section ID ${request.params.section_id} was not found!`));
                            else
                                reply(Boom.notFound(`User ID ${request.params.user_id} was not found!`))
                        });
                });
        },
        config: {
            notes: 'Allows a student to self-enroll into a given section_id, prevents against double enrolling in the same section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer(),
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}/students',
        handler: function (request, reply) {
            //create a response object
            var response = [];
            //get the section object
            Section
                .query()
                .where('id', request.params.section_id)
                .first()
                .then((section) => {
                    return section
                        //Get the users and their relationship_type for the section object
                        .$relatedQuery('user')
                        .eager('relationshipType')
                        .filterEager('relationshipType', builder => {
                            //it still gets all users, but we only want relationshipType to be added if the user is a student
                            builder.where('title', 'student'),
                                builder.andWhere('section_id', request.params.section_id),
                                builder.andWhere('offering_id', null)
                        })
                })
                .then((output) => {
                    //Format the response object
                    for (var i = 0; i < output.length; i++) {
                        //remove the password
                        delete output[i]['password'];
                        //if there is a relationship type, add it to the response object
                        if (output[i].relationshipType[0]) {
                            //remove the relationshipType JSON since this is only returning students
                            delete output[i].relationshipType
                            response.push(output[i]);
                        }
                    }
                    reply(response);
                })
                .catch((err) => {
                    reply(Boom.notFound(`Section ID ${request.params.section_id} was not found!`));
                });
        },
        config: {
            notes: 'gets all the students for a given section_id',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });
    next();
};

exports.register.attributes = { name: 'schedule', version: '0.0.7' };
