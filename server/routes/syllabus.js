'use strict';

const Joi = require('joi');
const Boom = require('boom');
const LearningOutcome = require('../models/LearningOutcome');
const KnowledgeArea = require('../models/KnowledgeArea');
const Offering = require('../models/Offering');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/offerings/{offering_id}/outcomes',
        handler: function (request, reply) {
            Offering
                .query()
                .findById(request.params.offering_id)
                .eager('learningOutcomes.knowledgeAreas')
                .then((offering) => {
                    reply(offering);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the learning outcomes and knowledge_areas for a given offering_id',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/offerings/{offering_id}/outcomes/{learning_outcomes_id}',
        handler: function (request, reply) {
            Offering
                .query()
                .findById(request.params.offering_id)
                .then((offering) => {
                    if (offering) {
                        LearningOutcome
                            .query()
                            .findById(request.params.learning_outcomes_id)
                            .eager('[knowledgeAreas, offerings]')
                            .then((learningOutcome) => {
                                if (learningOutcome)
                                    reply(learningOutcome);
                                else
                                    reply(Boom.notFound(`Learning Outcome ID ${request.params.learning_outcomes_id} was not found!`));
                            })
                    } else {
                        reply(Boom.notFound(`Offering ID ${request.params.offering_id} was not found!`));
                    }
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves the learning_outcomes for the given learning_outcomes_id for a given offering_id',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer(),
                    learning_outcomes_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/offerings/{offering_id}/outcomes',
        handler: function (request, reply) {
            KnowledgeArea
                .query()
                .findById(request.payload.knowledge_area_id)
                .then((knowledgeArea) => {
                    if (knowledgeArea) {
                        Offering
                            .query()
                            .findById(request.params.offering_id)
                            .then((offering) => {
                                if (offering) {
                                    LearningOutcome
                                        .query()
                                        .insert({
                                            title: request.payload.title,
                                            description: request.payload.description,
                                            knowledge_area_id: request.payload.knowledge_area_id
                                        })
                                        .then((newOutcome) => {
                                            reply(newOutcome);
                                            newOutcome.$relatedQuery('offerings').relate(request.params.offering_id).return();
                                        });
                                } else {
                                    reply(Boom.notFound('Offering ID ' + request.params.offering_id + ' was not found!'));
                                }
                            })

                    } else {
                        reply(Boom.notFound('Knowledge Area ID ' + request.payload.knowledge_area_id + ' was not found!'));
                    }
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'creates a new outcome for a given offering_id',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer()
                },
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string(),
                    knowledge_area_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/offerings/{offering_id}/outcomes/{learning_outcomes_id}',
        handler: function (request, reply) {

            KnowledgeArea
                .query()
                .findById(request.payload.knowledge_area_id)
                .then((knowledgeArea) => {
                    if (knowledgeArea) {
                        Offering
                            .query()
                            .findById(request.params.offering_id)
                            .then((offering) => {
                                if (offering) {
                                    LearningOutcome
                                        .query()
                                        .patchAndFetchById(request.params.learning_outcomes_id, {
                                            title: request.payload.title,
                                            description: request.payload.description,
                                            knowledge_area_id: request.payload.knowledge_area_id
                                        })
                                        .then((newOutcome) => {
                                            if(newOutcome)
                                                reply(newOutcome);
                                            else
                                                reply(Boom.notFound('Learning Outcome ID ' + request.params.learning_outcomes_id + ' was not found!'));
                                        });
                                } else {
                                    reply(Boom.notFound('Offering ID ' + request.params.offering_id + ' was not found!'));
                                }
                            })

                    } else {
                        reply(Boom.notFound('Knowledge Area ID ' + request.payload.knowledge_area_id + ' was not found!'));
                    }
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Updates the a learning_outcome for a given id learning outcome ID',
            validate: {
                params: {
                    offering_id: Joi.number().positive().integer(),
                    learning_outcomes_id: Joi.number().positive().integer()
                },
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string(),
                    knowledge_area_id: Joi.number().positive().integer()
                }
            }
        }
    });

        server.route({
        method: 'GET',
        path: '/knowledgearea',
        handler: function (request, reply) {
            KnowledgeArea
                .query()
                .then((knowledgeArea) => {
                    reply(knowledgeArea);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the knowledge areas from the database'
        }
    });

    server.route({
        method: 'GET',
        path: '/knowledgearea/{knowledge_area_id}',
        handler: function (request, reply) {
            KnowledgeArea
                .query()
                .findById(request.params.knowledge_area_id)
                .then((knowledgeArea) => {
                    if (knowledgeArea)
                        reply(knowledgeArea);
                    else
                        reply(Boom.notFound('Knowledge Area ID ' + request.params.knowledge_area_id + ' was not found!'))
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'returns the knowledge area information for a given knowledge_area_id',
            validate: {
                params: {
                    knowledge_area_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/knowledgearea',
        handler: function (request, reply) {
            KnowledgeArea
                .query()
                .insert({
                    title: request.payload.title,
                    description: request.payload.description
                })
                .then((knowledgeArea) => {
                    reply(knowledgeArea);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'creates a knowledge area ',
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description:  Joi.string()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/knowledgearea/{knowledge_area_id}',
        handler: function (request, reply) {
            KnowledgeArea
                .query()
                .patchAndFetchById(request.params.knowledge_area_id, {
                    title: request.payload.title,
                    description: request.payload.description
                })
                .then((knowledgeArea) => {
                    reply(knowledgeArea);
                })
                .catch(function (err) {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Updates the knowledge area information for a given knowledge_area_id',
            validate: {
                params: {
                    knowledge_area_id: Joi.number().positive().integer()
                },
                payload: {
                    title: Joi.string().required(),
                    description:  Joi.string()
                }
            }
        }
    });

    next();
};

exports.register.attributes = { name: 'syllabus', version: '0.0.2' };
