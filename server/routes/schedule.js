'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Section = require('../models/Section');
const User = require('../models/User');
const Term = require('../models/Term');
const RelationshipType = require('../models/RelationshipType');
const Offering = require('../models/Offering');
const UserSection = require('../models/UserSection');
const UserOffering = require('../models/UserOffering');

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
                .findById(request.params.term_id)
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
            Section
                .query()
                .eager('[sectionSchedule, sequence.offering.course.[prefix, department], user]')
                .then((section) => {
                        reply(section);
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the sections from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            Section
                .query()
                .findById(request.params.section_id)
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
                        .findById(request.auth.credentials.id)
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
                        .findById(request.params.user_id)
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
        path: '/sections/{section_id}/relationships/{relationship_type_id}',
        handler: function (request, reply) {
            //find the relationship type for a relationship_type_id
            RelationshipType
                .query()
                .findById(request.params.relationship_type_id)
                .then((relationship) => {
                    //if it doesn't exist blow up
                    if(!relationship)
                        return reply(Boom.notFound('Relationship Type ID ' + request.params.relationship_type_id + ' was not found!'));
                    else {
                        //find the section for a section_id
                        Section
                            .query()
                            .findById(request.params.section_id)
                            .then((section) => {
                                //if it doesn't exist blow up
                                if(!section)
                                    return reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                                else {
                                    //get all the users related to the section so only the users 
                                    //select is required so that the password is not sent back
                                    return section
                                        .$relatedQuery('user')
                                        .select('id', 'first_name', 'last_name', 'campus_id', 'email')
                                        .where('relationship_type_id', request.params.relationship_type_id)
                                }
                            })
                            .then((response) => {
                                //prevents a double reply error when sending back the response
                                if(response.isBoom != true)
                                    reply(response);
                            });
                    }
                });
        },
        config: {
            notes: 'gets all the users for a given section_id based on their relationship_type',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer(),
                    relationship_type_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/offerings/{offering_id}/relationships/{relationship_type_id}',
        handler: function (request, reply) {
            //find the relationship type for a relationship_type_id
            RelationshipType
                .query()
                .findById(request.params.relationship_type_id)
                .then((relationship) => {
                    //if it doesn't exist blow up
                    if(!relationship)
                        return reply(Boom.notFound('Relationship Type ID ' + request.params.relationship_type_id + ' was not found!'));
                    else {
                        //find the section for a offering_id
                        Offering
                            .query()
                            .findById(request.params.offering_id)
                            .then((section) => {
                                //if it doesn't exist blow up
                                if(!section)
                                    return reply(Boom.notFound('Offering ID ' + request.params.offering_id + ' was not found!'));
                                else {
                                    //get all the users related to the offering so only the users 
                                    //select is required so that the password is not sent back
                                    return section
                                        .$relatedQuery('user')
                                        .select('id', 'first_name', 'last_name', 'campus_id', 'email')
                                        .where('relationship_type_id', request.params.relationship_type_id)
                                }
                            })
                            .then((response) => {
                                //prevents a double reply error when sending back the response
                                if(response.isBoom != true)
                                    reply(response);
                            });
                    }
                });
        },
        config: {
            notes: 'gets all the users for a given offering_id based on their relationship_type',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer(),
                    relationship_type_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/relationships/{relationship_type_id}',
        handler: function (request, reply) {
            //find the relationship type for a relationship_type_id
            RelationshipType
                .query()
                .findById(request.params.relationship_type_id)
                .then((relationship) => {
                    //if it doesn't exist blow up
                    if(!relationship)
                        return reply(Boom.notFound('Relationship Type ID ' + request.params.relationship_type_id + ' was not found!'));
                    else {
                        //find the section for a section_id
                        Section
                            .query()
                            .findById(request.params.section_id)
                            .then((section) => {
                                //if it doesn't exist blow up
                                if(!section)
                                    return reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                                else {
                                    //relate the curerrent user and the given relationship_type_id accross the section
                                    return section
                                        .$relatedQuery('user')
                                        .relate({
                                            id: request.auth.credentials.id,
                                            relationship_type_id: request.params.relationship_type_id
                                        })
                                    .catch((err) => {
                                        //error out if referential integrity bulks about the relationship already existing
                                        return reply(Boom.badRequest('You are already enrolled in section ID ' + request.params.section_id));
                                    });
                                }
                            })
                            .then((response) => {
                                //prevents a double reply error when sending back the response
                                if(response.isBoom != true){
                                    response['section_id'] = request.params.section_id;
                                    reply(response);
                                }
                            });
                    }
                });
        },
        config: {
            notes: 'assocaites the current user to the section_id with the given relationship_type_id',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer(),
                    relationship_type_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/offerings/{offering_id}/relationships/{relationship_type_id}',
        handler: function (request, reply) {
            //find the relationship type for a relationship_type_id
            RelationshipType
                .query()
                .findById(request.params.relationship_type_id)
                .then((relationship) => {
                    //if it doesn't exist blow up
                    if(!relationship)
                        return reply(Boom.notFound('Relationship Type ID ' + request.params.relationship_type_id + ' was not found!'));
                    else {
                        //find the section for a section_id
                        Offering
                            .query()
                            .findById(request.params.offering_id)
                            .then((offering) => {
                                //if it doesn't exist blow up
                                if(!offering)
                                    return reply(Boom.notFound('Offering ID ' + request.params.offering_id + ' was not found!'));
                                else {
                                    //relate the curerrent user and the given relationship_type_id accross the offering
                                    return offering
                                        .$relatedQuery('user')
                                        .relate({
                                            id: request.auth.credentials.id,
                                            relationship_type_id: request.params.relationship_type_id
                                        })
                                    .catch((err) => {
                                        //error out if referential integrity bulks about the relationship already existing
                                        return reply(Boom.badRequest('You are already enrolled in offering ID ' + request.params.offering_id));
                                    });
                                }
                            })
                            .then((response) => {
                                //prevents a double reply error when sending back the response
                                if(response.isBoom != true){
                                    response['offering_id'] = request.params.offering_id;
                                    reply(response);
                                }
                            });
                    }
                });
        },
        config: {
            notes: 'assocaites the current user to the offering_id with the given relationship_type_id',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer(),
                    relationship_type_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/relationships',
        handler: function(request, reply) {
            RelationshipType
                .query()
                .then((relationships) => {
                    reply(relationships);
                });
        },
        config: {
            notes: 'gets all the relationship_types for sections/offerings from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/relationships/{relationship_type_id}',
        handler: function(request, reply) {
            RelationshipType
                .query()
                .findById(request.params.relationship_type_id)
                .then((relationship) => {
                    if(relationship)
                        reply(relationship);
                    else
                        reply(Boom.notFound('Relationship Type ID ' + request.params.relationship_type_id + ' was not found!'))
                });
        },
        config: {
            notes: 'gets a specific relationship_type object for sections/offerings from the database'
        }
    });

    next();
};

exports.register.attributes = { name: 'schedule', version: '0.0.8' };
