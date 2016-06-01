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
                //get database
                reply({statusCode: 200, method: "post", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
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
        path: '/section/{section_id}',
        handler: function (request, reply) {
            var response = bookshelf.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
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
                //get database
                reply({statusCode: 200, method: "put", response: model})
            }).catch(function (error) {
                reply({statusCode: 500, err: error});
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
