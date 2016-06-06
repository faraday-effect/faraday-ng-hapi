const Joi = require('joi');
const bookshelf = require('./../bookshelf');

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
                return reply(Boom.badImplementation('Uh oh! Something went wrong!', err));
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
            bookshelf.Section.where({id: request.params.section_id}).fetch().then(function (model) {
                bookshelf.Offering.where({id: model.get('offering_id')}).fetch().then(function (model2) {
                    bookshelf.Course.where({id: model2.get('course_id')}).fetch().then(model3 => {
                        bookshelf.Prefix.where({id: model3.get('prefix_id')}).fetch().then(function (model4) {
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
        method: 'PUT',
        path: '/sections/{section_id}',
        handler: function (request, reply) {
            bookshelf.Section.forge({'id': request.params.section_id})
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
            var response = bookshelf.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
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

exports.register.attributes = {name: 'sections', version: '0.0.1'};
