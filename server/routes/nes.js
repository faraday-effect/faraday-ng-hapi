const Nes = require('nes');
const Boom = require('boom');

exports.register = function (server, options, next) {

    server.register(Nes, function (err) {
        server.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                return reply('This is a confirmation of a working instantiation of a socket with NES!');
            },
            config: {
                auth: false,
                id: 'hello'
            }
        });

        server.subscription('/attendence', {auth: false});

    });
    next();
};

exports.register.attributes = {name: 'sockets_nes', version: '0.0.1'};