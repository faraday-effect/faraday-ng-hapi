const Joi = require('joi');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {
    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            reply({err: false, session: '86fb269d190d2c85f6e0468ceca42a20', user: 'user_obj'})
        },
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().lowercase(),
                    password: Joi.string()
                }
            }
        }
    });
    next();


    server.route({
        method: 'POST',
        path: '/logout',
        handler: function (request, reply) {
            reply({success: true})
        },
        config: {
            notes: 'to be implemented later - unknown'
        }
    });
    next();
};

exports.register.attributes = {name: 'authentication', version: '0.0.1'};