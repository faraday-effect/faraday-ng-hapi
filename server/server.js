'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000 });

//Serving dynamic content
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('It works!');
    }
});

//Serving static content
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
    method: 'GET',
    path: '/my_css',
    handler: function (request, reply) {
        reply.file('./server/static/special_style.css');
    }
});
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

    //Checks to see if an error occured while loading the plugin
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