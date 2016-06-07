'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Poop = require('poop');
const Path = require('path');
const Nes = require('nes');

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

server.register([
    //authentication
    {register: require('hapi-auth-cookie')},
    //Sockets
    {register: require('./routes/nes')},
    //lout requirements
    {register: require('vision')},
    {register: require('inert')},
    {register: require('lout')},
    //route plugins
    {register: require('./routes/attendance')},
    {register: require('./routes/authentication')},
    {register: require('./routes/courses')},
    {register: require('./routes/departments')},
    {register: require('./routes/prefixes')},
    {register: require('./routes/sections')},
    {register: require('./routes/terms')},
    {register: require('./routes/users')}
], (err) => {
    if (err) {
        throw err;
    }
});

//Registers and sets up Poop (dump logging to a file)
server.register({
    register: Poop,
    options: {
        logPath: Path.join(__dirname, 'logs', 'poop.log'),
        heapdumpFolder: Path.join(__dirname, 'logs')
    }
});

//Registers and sets up logging in the console
server.register({
    register: Good,
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
}, (err) => {
    //Checks to see if an error occurred while loading the plugins
    if (err) {
        throw err;
    }
    server.start((err) => {
        //server.broadcast('Welcome!');

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
