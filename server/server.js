'use strict';

const Hapi = require('hapi');
const Good = require('good');
const server = new Hapi.Server();
server.connection({
    port: 3000,
    routes: {
        cors: true
    }
});

server.register([require('vision'), require('inert'), {register: require('lout')}], function (err) {
});

server.register([
    {register: require('./routes/prefixes')},
    {register: require('./routes/sections')},
    {register: require('./routes/courses')},
    {register: require('./routes/terms')},
    {register: require('./routes/departments')}
], (err) => {
    if (err) {
        throw err;
    }
});

//Server logging and starting functionality
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

    //Checks to see if an error occurred while loading the plugin
    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
