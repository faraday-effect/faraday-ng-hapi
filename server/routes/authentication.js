const Joi = require('joi');
const bcrypt = require('bcrypt');
const bookshelf = require('./../bookshelf');

exports.register = function (server, options, next) {

    const validateUser = function (request, email, password, callback) {
        var user = {};

        console.log(email, password);
        new bookshelf.Person({email: email}).fetch().then((model) => {
            user = model.toJSON();
            console.log(user);

            bcrypt.compare(password, user.password, (err, isValid) => {
                callback(err, isValid, {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                });
            });
        }).catch(() => {
            return callback(null, false);
        });
    };

    server.auth.strategy('login', 'basic', {validateFunc: validateUser});

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            
            if (request.auth.isAuthenticated) {
                reply(request.auth);
            }

            //reply({success: false})
        },
        config: {

            validate: {
                payload: {
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/logout',
        handler: function (request, reply) {
            //request.auth.session.clear();
            reply({success: true})
        },
        config: {
            notes: 'Removes session token from the browser'
        }
    });


    next();
};

exports.register.attributes = {name: 'authentication', version: '0.0.1'};