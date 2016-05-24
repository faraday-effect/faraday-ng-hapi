'use strict';

const Hapi = require('hapi');

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

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Faraday');
    console.log('Server running at:', server.info.uri);
});