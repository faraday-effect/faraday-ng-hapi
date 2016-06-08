'use strict';

const Hapi = require('hapi');
const Path = require('path');

module.exports = function(callback) {

    const server = new Hapi.Server();

    server.connection({
        port: 3000,
        routes: {
            cors: {
                origin: ['http://localhost:4200'],
                credentials: true
            }
        }
    });

    server.register(
        [
            // Authentication
            {register: require('hapi-auth-cookie')},

            // Web Sockets
            {register: require('./routes/nes')},

            // Traditional content (including lout)
            {register: require('vision')},
            {register: require('inert')},
            {register: require('lout')},

            // Route plugins
            {register: require('./routes/attendance')},
            {register: require('./routes/authentication')},
            {register: require('./routes/courses')},
            {register: require('./routes/departments')},
            {register: require('./routes/prefixes')},
            {register: require('./routes/sections')},
            {register: require('./routes/terms')},
            {register: require('./routes/users')},

            // Logging and reporting
            {
                register: require('poop'),
                options: {
                    logPath: Path.join(__dirname, 'logs', 'poop.log'),
                    heapdumpFolder: Path.join(__dirname, 'logs')
                }
            },
            {
                register: require('good'),
                options: {
                    reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                response: '*',
                                log: '*'
                            }]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }

        ], (err) => callback(err, server));
};