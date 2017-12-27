'use strict';

const Hapi = require('hapi');
const Path = require('path');

var nes_options = {
  auth: {
    type: "cookie",
    isSecure: false,
  }
};
if (process.env.NES_DISABLE_HEARTBEAT) {
  nes_options.heartbeat = false;
}

module.exports = function (callback) {

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
            // Simple test
            {register: require('./routes/ping')},

            // Authentication
            {register: require('hapi-auth-cookie')},

            // Web Sockets
            {register: require('nes'), options: nes_options},

            // Traditional content (including lout)
            {register: require('vision')},
            {register: require('inert')},
            {register: require('lout')},

            // Route plugins
            {register: require('./routes/attendance')},
            {register: require('./routes/authentication')},
            {register: require('./routes/catalog')},
            {register: require('./routes/departments')},
            {register: require('./routes/execution')},
            {register: require('./routes/nes')},
            {register: require('./routes/schedule')},
            {register: require('./routes/syllabus')},
            {register: require('./routes/users')},
            
            // Other plugins
            {register: require('./plugins/codeGenerator')},
            {register: require('./plugins/quiz')},

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
        ],

        (err) => callback(err, server));
};
