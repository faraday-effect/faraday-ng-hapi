const Nes = require('nes');
const Boom = require('boom');
const Joi = require('joi');

const Section = require('../models/Section');
const attendance_code_length = 6;

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/attendance',
        handler: function (request, reply) {
            var code = '000000';
            if(code === request.payload.code){
                Section
                    .query()
                    .where('id', request.params.section_id)
                    .first()
                    .then((section) => {
                        return section.$relatedQuery('offering');
                    })
                    .then((offering) => {
                        console.log(offering);
                        offering[0].$relatedQuery('actualClass');
                    }).then((actualClass) => {
                        reply(actualClass);
                    });
            } else {
                return reply(Boom.badRequest('Your attendance code is invalid!'));
            }
        },
        config: {
            notes: 'Marks the student as present once the class has begun',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                },
                payload: {
                    code: Joi.string().length(attendance_code_length).required()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/attendance',
        handler: function (request, reply) {
            bookshelf.Attendance.forge()
                .where({actual_class_id: request.payload.actual_class_id,  
                student_id: request.payload.student_id})
                .save({
                signed_out: new Date()
            },
            { method: 'update', patch: true })
                .then((model) => {
                    model.fetch()
                    .then((newModel) => {
                        reply(newModel);
                    });
                });
        },
        config: {
            notes: 'Puts a student inside the class when the course code is correct',
            validate: {
                payload: {
                    actual_class_id: Joi.number().integer().required(),
                    student_id: Joi.number().integer().required()
                }
            }
        }
    });

    server.register(Nes, function (err) {
        server.subscription('/attendance');
    });
    next();
};

exports.register.attributes = {name: 'execution', version: '0.0.1'};