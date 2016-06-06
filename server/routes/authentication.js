const Joi = require('joi');
const bcrypt = require('bcrypt');
const bookshelf = require('./../bookshelf');
var uuid = 1;

exports.register = function (server, options, next) {

    const cache = server.cache({segment: 'sessions', expiresIn: 24 * 60 * 60 * 1000});
    server.app.cache = cache;

    const validate = function (request, session, callback) {
        cache.get(session.sid, (err, cached) => {
            if (err) {
                return callback(err, false);
            }

            if (!cached) {
                return callback(null, false);
            }

            return callback(null, true, cached.user);
        });
    };

    //defaults to set authentication on all routes
    server.auth.strategy('session', 'cookie', {
        cookie: 'faraday-cookie',                           //cookie name
        isSecure: false,                                    //set to true for production apps
        password: '01234567890123456789012345678912',       //cookie secret
        redirectTo: false,                                  //client is handling
        ttl: 24 * 60 * 60 * 1000                            //expires in 1 day
        
    });

    //secures all routes
    server.auth.default({strategy: 'session'});

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            var user = {};

            new bookshelf.Person({email: request.payload.email}).fetch().then((model) => {
                user = model.toJSON();
                console.log(user);

                bcrypt.compare(request.payload.password, user.password, (err, isValid) => {
                    if (!isValid) {
                        if (err) {
                            return reply({err: err, isValid: isValid});
                        }
                        return reply({isValid: isValid, err: 'Incorrect password'})
                    }
                    const sid = String(++uuid);
                    cache.set(sid, {user: user}, 0, (err) => {
                        if (err) {
                            reply(err);
                        }
                        request.cookieAuth.set({sid: sid});
                        delete user['password'];
                        delete user['office_phone'];
                        delete user['mobile_phone'];
                        reply(user);
                    });
                });

            }).catch(() => {
                return reply({isValid: false, err: 'Invalid email or password'});
            });
        },
        config: {
            auth: false,
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
            request.cookieAuth.clear();
            reply({success: true})
        },
        config: {
            notes: 'Removes session token from the browser'
        }
    });

    next();
};

exports.register.attributes = {name: 'authentication', version: '0.0.1'};