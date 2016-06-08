const Joi = require('joi');
const Boom = require('boom');
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
                    console.log('I AM NULL');
                    if (request.payload.code === code) {
                        new bookshelf.Attendance({
                            'actual_class_id': request.payload.actual_class_id,
                            'student_id': request.payload.student_id,
                            'signed_in': new Date()
                        }).save().then((model) => {
                            server.publish('/attendence', { student_id: request.payload.student_id, actual_class_id: request.payload.actual_class_id });
                            return reply(model);
                        }).catch((err) => {
                            return reply(Boom.badImplementation('Failed to create attendance instance', err));
                        });
                    } else {
                return reply(Boom.badData('the code you entered was incorrect'));
                    }
                } else {
                    return reply(model);
                }
                
            }).catch((err) => {
                return reply(Boom.badImplementation('I blew up', err));
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
        method: 'GET',
        path: '/attendance',
        handler: function (request, reply) {
            bookshelf.Attendance.where('actual_class_id', request.params.actual_class_id).fetchAll().then((Collection) => {
                reply(Collection);
            }).catch(function (err) {
                return reply(Boom.badImplementation('Couldn\'t find attendance records for class ID ' + request.params.actual_class_id, err));
            });
        },
        config: {
            notes: 'returns the attendence for a class',
            validate: {
                params: {
                    actual_class_id: Joi.number().integer().required()
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
    next();
};

exports.register.attributes = {name: 'attendance', version: '0.0.2'};