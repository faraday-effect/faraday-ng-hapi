const Joi = require('joi');
const bookshelf = require('./../bookshelf');
const attendance_code_length = 6;

exports.register = function (server, options, next) {
    server.route({
        method: 'POST',
        path: '/attendance',
        handler: function (request, reply) {
            var code = '000000';
            console.log();
            if (request.payload.code === code) {
                new bookshelf.Attendance({actual_class_id: 0, student_id: 0}).save().then((model) => {
                    reply({success: true, model: model});
                    //send to socket to instructor projector view 'student id'
                });
            }
            else
                reply({success: false});
        },
        config: {
            validate: {
                payload: {
                    actual_class_id: Joi.number().integer().required(),
                    student_id: Joi.number().integer().required(),
                    code: Joi.string().length(attendance_code_length).required()
                }
            }
        }
    });
    next();


    server.route({
        method: 'GET',
        path: '/attendance',
        handler: function (request, reply) {
            bookshelf.Attendance.where('actual_class_id', request.params.actual_class_id).fetchAll().then((Collection) => {
                reply(Collection);
            }).catch(function (error) {
                reply({err: error});
            });
        },
        config: {
            validate: {
                params: {
                    actual_class_id: Joi.number().integer().required()
                }
            },
            notes: 'to be implemented later - unknown'
        }
    });
    next();
};

exports.register.attributes = {name: 'attendance', version: '0.0.1'};