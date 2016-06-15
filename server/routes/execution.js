const Nes = require('nes');
const Boom = require('boom');
const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const attendance_code_length = 6;

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/attendance',
        handler: function (request, reply) {
            var code = '000000';
            bookshelf.Attendance
            .forge({
                    'actual_class_id': request.payload.actual_class_id, 
                    'student_id': request.payload.student_id
            })
            .fetch()
            .then((model) => {
                if (model == null) {
                    if (request.payload.code === code) {
                        new bookshelf.Attendance({
                            'actual_class_id': request.payload.actual_class_id,
                            'student_id': request.payload.student_id,
                            'signed_in': new Date()
                        }).save().then((model) => {
                            server.publish('/attendance', { student_id: request.payload.student_id, actual_class_id: request.payload.actual_class_id });
                            return reply(model);
                        }).catch((err) => {
                            return reply(Boom.badImplementation('Failed to create attendance instance', err));
                        });
                    } else {
                return reply(Boom.badData('The code you entered was incorrect'));
                    }
                } else {
                    return reply(model);
                }
                
            }).catch((err) => {
                return reply(Boom.badImplementation('Failed to find your attendance records', err));
            });
        },
        config: {
            notes: 'Puts a student inside the class when the course code is correct',
            validate: {
                payload: {
                    actual_class_id: Joi.number().integer().required(),
                    student_id: Joi.number().integer().required(),
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