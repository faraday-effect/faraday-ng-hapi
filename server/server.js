'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Poop = require('poop');
const Path = require('path');
const Nes = require('nes');

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
            //{register: require('./routes/nes')},

            // Traditional content (including lout)
            {register: require('vision')},
            {register: require('inert')},
            {register: require('lout')},

            // Route plugins
            {register: require('./routes/authentication')},
            {register: require('./routes/catalog')},
            {register: require('./routes/departments')},
            {register: require('./routes/execution')},
            {register: require('./routes/schedule')},
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
