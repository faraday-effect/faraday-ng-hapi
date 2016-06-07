const Nes = require('nes');

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

        server.subscription('/attendence');

        setTimeout(() => {
            server.publish('/attendence', {id: 5, status: 'complete'})
        }, 10000);
    });
    next();
};

exports.register.attributes = {name: 'sockets_nes', version: '0.0.1'};