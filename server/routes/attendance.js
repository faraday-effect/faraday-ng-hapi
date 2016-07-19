const Boom = require('boom');
const Joi = require('joi');

const Section = require('../models/Section');
const ActualClass = require('../models/ActualClass');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const attendance_code_length = require('../plugins/codeGenerator').attendance_code_length;

exports.register = function (server, options, next) {
    server.route({
        method: 'POST',
        path: '/sections/{section_id}/attendance',
        handler: function (request, reply) {
            //Get the section and sequence information
            Section
                .query()
                .findById(request.params.section_id)
                .eager('sequence')
                .then((section) => {
                    //handle error case if section is not valid
                    if (section != null) {
                        ActualClass
                            .query()
                            //find the actual class for today after the professor has started class
                            .where('sequence_id', section.sequence.id)
                            .andWhere('stop_time', null)
                            .first()
                            .then((actual_class) => {
                                //handle the case to make sure the professor has started class
                                if (actual_class != null) {
                                    //Load attendance object for current_user using today's actual_class_id
                                    server.methods.attendance.checkCode(actual_class.sequence_id, request.payload.code, (err, result) => {
                                        if (!err) {
                                            console.log(result);
                                            if (result) {
                                                Attendance
                                                    .query()
                                                    .where('actual_class_id', actual_class.id)
                                                    .andWhere('user_id', request.auth.credentials.id)
                                                    .first()
                                                    .then((alreadyRegisteredAttendanceRecord) => {
                                                        //check to see if they are already listed as attending class today
                                                        if (alreadyRegisteredAttendanceRecord != null) {
                                                            return reply(Boom.badRequest('You already are listed as present for this class!'));
                                                        } else {
                                                            server.publish(`/sections/${request.params.section_id}/attendance`, { user_id: request.auth.credentials.id, present: true });
                                                            //insert the attendance record with a time stamp
                                                            Attendance
                                                                .query()
                                                                .insert({
                                                                    signed_in: new Date(),
                                                                    user_id: request.auth.credentials.id,
                                                                    actual_class_id: actual_class.id
                                                                })
                                                                .then((attendanceEntry) => {
                                                                    reply(attendanceEntry);
                                                                });
                                                        }
                                                    });
                                            } else {
                                                return reply(Boom.badRequest('Your attendance code is invalid!'));
                                            }
                                        } else {
                                            reply(Boom.badImplementation(err));
                                        }
                                    });
                                } else {
                                    reply(Boom.badRequest('Your professor has not started class yet!'))
                                }
                            });
                    } else {
                        reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                    }
                })
                .catch((err) => {
                    return reply(Boom.badImplementation(err));
                });
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
        path: '/sections/{section_id}/attendance',
        handler: function (request, reply) {
            //Get the section and sequence information
            Section
                .query()
                .findById(request.params.section_id)
                .eager('sequence')
                .then((section) => {
                    //handle error case if section is not valid
                    if (section != null) {
                        ActualClass
                            .query()
                            //find the actual class for today after the professor has started class
                            .where('sequence_id', section.sequence.id)
                            .andWhere('stop_time', null)
                            .first()
                            .then((actual_class) => {
                                //handle the case to make sure the professor has started class
                                if (actual_class != null) {
                                    //Load attendance object for current_user using today's actual_class_id
                                    Attendance
                                        .query()
                                        .where('actual_class_id', actual_class.id)
                                        .andWhere('user_id', request.auth.credentials.id)
                                        .first()
                                        .then((alreadyRegisteredAttendanceRecord) => {
                                            //check to see if they are already listed as attending class today
                                            if (alreadyRegisteredAttendanceRecord == null) {
                                                return reply(Boom.badRequest('You are not marked as present for this class!'));
                                            } else {
                                                //insert the attendance record with a time stamp
                                                server.publish(`/sections/${request.params.section_id}/attendance`, { user_id: request.auth.credentials.id, present: false });
                                                Attendance
                                                    .query()
                                                    .patchAndFetchById(alreadyRegisteredAttendanceRecord.id, {
                                                        signed_out: new Date()
                                                    })
                                                    .then((attendanceEntry) => {
                                                        reply(attendanceEntry);
                                                    });
                                            }
                                        });
                                } else {
                                    reply(Boom.badRequest('Class has already ended!'))
                                }
                            });
                    } else {
                        reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                    }
                })
                .catch((err) => {
                    return reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Sets the student\'s signed_out time in their attendance record',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/sections/{section_id}/attendance',
        handler: function (request, reply) {
            //Get the section and sequence information
            Section
                .query()
                .findById(request.params.section_id)
                .eager('sequence')
                .then((section) => {
                    //handle error case if section is not valid
                    if (section != null) {
                        ActualClass
                            .query()
                            //find the actual class for today after the professor has started class
                            .where('sequence_id', section.sequence.id)
                            .andWhere('stop_time', null)
                            .first()
                            .then((actual_class) => {
                                //handle the case to make sure the professor has started class
                                if (actual_class != null) {
                                    //Load attendance object for current_user using today's actual_class_id
                                    Attendance
                                        .query()
                                        .where('actual_class_id', actual_class.id)
                                        .andWhere('user_id', request.auth.credentials.id)
                                        .first()
                                        .then((alreadyRegisteredAttendanceRecord) => {
                                            //check to see if they are already listed as attending class today
                                            if (alreadyRegisteredAttendanceRecord != null) {
                                                return reply({ attending: true, message: 'You\'re already listed as attending for this class' });
                                            } else {
                                                return reply({ attending: false, message: 'You are not attending this class' });
                                            }
                                        });
                                } else {
                                    return reply({ attending: false, message: 'Your professor has not yet started class' });
                                }
                            });
                    } else {
                        reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                    }
                })
                .catch((err) => {
                    return reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'Tells the whether the current_user is listed as attending a given section of class',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sections/{section_id}/users/{user_id}/attendance',
        handler: function (request, reply) {
            User
                .query()
                .where('id', request.params.user_id)
                .first()
                .then((user) => {
                    if (!user) {
                        reply(Boom.notFound(`User ID ${request.params.user_id} was not found!`));
                    } else {
                        Section
                            .query()
                            .where('id', request.params.section_id)
                            .eager('sequence')
                            .first()
                            .then((section) => {
                                //handle error case if section is not valid
                                if (section != null) {
                                    ActualClass
                                        .query()
                                        //find the actual class for today after the professor has started class
                                        .where('sequence_id', section.sequence.id)
                                        .andWhere('stop_time', null)
                                        .first()
                                        .then((actual_class) => {
                                            //handle the case to make sure the professor has started class
                                            if (actual_class != null) {
                                                //Load attendance object for current_user using today's actual_class_id
                                                Attendance
                                                    .query()
                                                    .where('actual_class_id', actual_class.id)
                                                    .andWhere('user_id', request.params.user_id)
                                                    .first()
                                                    .then((alreadyRegisteredAttendanceRecord) => {
                                                        //check to see if they are already listed as attending class today
                                                        if (alreadyRegisteredAttendanceRecord != null) {
                                                            return reply(Boom.badRequest(request.params.user_id + ' is already listed as present for this class!'));
                                                        } else {
                                                            //Send a information to socket
                                                            server.publish(`/sections/${request.params.section_id}/attendance`, { user_id: request.params.user_id, present: true });
                                                            //insert the attendance record with a time stamp
                                                            Attendance
                                                                .query()
                                                                .insert({
                                                                    signed_in: new Date(),
                                                                    user_id: request.params.user_id,
                                                                    actual_class_id: actual_class.id
                                                                })
                                                                .then((attendanceEntry) => {
                                                                    reply(attendanceEntry);
                                                                });
                                                        }
                                                    });
                                            } else {
                                                reply(Boom.badRequest('The professor has not started class yet!'))
                                            }
                                        });
                                } else {
                                    reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                                }
                            })
                            .catch((err) => {
                                return reply(Boom.badImplementation(err));
                            });

                    }
                });

        },
        config: {
            notes: 'Marks the user_id as present once the class has begun',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer(),
                    user_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/sections/{section_id}/users/{user_id}/attendance',
        handler: function (request, reply) {
            User
                .query()
                .where('id', request.params.user_id)
                .first()
                .then((user) => {
                    if (!user) {
                        reply(Boom.notFound(`User ID ${request.params.user_id} was not found!`));
                    } else {
                        //Get the section and sequence information
                        Section
                            .query()
                            .where('id', request.params.section_id)
                            .eager('sequence')
                            .first()
                            .then((section) => {
                                //handle error case if section is not valid
                                if (section != null) {
                                    ActualClass
                                        .query()
                                        //find the actual class for today after the professor has started class
                                        .where('sequence_id', section.sequence.id)
                                        .andWhere('stop_time', null)
                                        .first()
                                        .then((actual_class) => {
                                            //handle the case to make sure the professor has started class
                                            if (actual_class != null) {
                                                //Load attendance object for current_user using today's actual_class_id
                                                Attendance
                                                    .query()
                                                    .where('actual_class_id', actual_class.id)
                                                    .andWhere('user_id', request.params.user_id)
                                                    .first()
                                                    .then((alreadyRegisteredAttendanceRecord) => {
                                                        //check to see if they are already listed as attending class today
                                                        if (!alreadyRegisteredAttendanceRecord) {
                                                            return reply(Boom.badRequest(`${request.params.user_id} is not marked as present for this class!`));
                                                        } else {
                                                            //send user_id to the socket
                                                            server.publish(`/sections/${request.params.section_id}/attendance`, { user_id: request.params.user_id, present: false });
                                                            //insert the attendance record with a time stamp
                                                            Attendance
                                                                .query()
                                                                .patchAndFetchById(alreadyRegisteredAttendanceRecord.id, {
                                                                    signed_out: new Date()
                                                                })
                                                                .then((attendanceEntry) => {
                                                                    reply(attendanceEntry);
                                                                });
                                                        }
                                                    });
                                            } else {
                                                reply(Boom.badRequest('Class has already ended!'))
                                            }
                                        });
                                } else {
                                    reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                                }
                            })
                            .catch((err) => {
                                return reply(Boom.badImplementation(err));
                            });
                    }
                });


        },
        config: {
            notes: 'Sets the user_id\'s signed_out time in their attendance record',
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
        path: '/sections/{section_id}/classes',
        handler: function (request, reply) {
            //Get the sequence ID
            Section
                .query()
                .where('id', request.params.section_id)
                .eager('sequence')
                .first()
                .then((section) => {
                    //Checks to make sure the section exists
                    if (section != null) {
                        section
                            .sequence
                            .$relatedQuery('actualClass')
                            .then((existingActualClasses) => {
                                // Check to make sure that there has been at least one class started before
                                if (existingActualClasses.length) {
                                    reply(existingActualClasses)
                                } else {
                                    reply(Boom.badRequest('It appears no classes have been started for this section'));
                                }
                            });
                    } else {
                        reply(Boom.notFound('Section ID ' + request.params.section_id + ' was not found!'));
                    }
                })
                .catch((err) => {
                    reply(Boom.badImplementation(err));
                });
        },
        config: {
            notes: 'retrieves all the actual class instances for a section',
            validate: {
                params: {
                    section_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/classes/{actual_class_id}',
        handler: function (request, reply) {
            //Get the actual class instance and perform a patch to add reflection
            ActualClass
                .query()
                .patchAndFetchById(request.params.actual_class_id, {
                    reflection: request.payload.reflection
                })
                .then((actualClass) => {
                    //return new object
                    reply(actualClass);
                })
                .catch((err) => {
                    reply(Boom.notFound('Actual Class ID ' + request.params.actual_class_id + ' not found!'));
                });
        },
        config: {
            notes: 'Adds the reflection to an actual_class instance',
            validate: {
                params: {
                    actual_class_id: Joi.number().positive().integer()
                },
                payload: {
                    reflection: Joi.string().max(255)
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/classes/{actual_class_id}',
        handler: function (request, reply) {
            //get the actual class instance
            ActualClass
                .query()
                .where('id', request.params.actual_class_id)
                .first()
                .then((actualClass) => {
                    if (actualClass != null)
                        //return the new object
                        reply(actualClass);
                    else
                        reply(Boom.notFound('Actual Class ID ' + request.params.actual_class_id + ' not found!'));
                })
                .catch((err) => {
                    reply(Boom.badRequest());
                });
        },
        config: {
            notes: 'Retrieves all the actual class instances for a section',
            validate: {
                params: {
                    actual_class_id: Joi.number().positive().integer()
                }
            }
        }
    });

    server.subscription('/sections/{section_id}/attendance');
    next();
};

exports.attendance_code_length = attendance_code_length;
exports.register.attributes = { name: 'attendance', version: '0.0.4' };