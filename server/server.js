'use strict';

const Hapi = require('hapi');
const Good = require('good');
var bookshelf = require('./bookshelf');


const server = new Hapi.Server();
server.connection({
    port: 3000,
    routes: {
        cors: true
    }
});

server.register([require('vision'), require('inert'), {register: require('lout')}], function (err) {
});

//Serving dynamic content
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('It works!');
    }
});

//Course Routes
server.route({
    method: 'GET',
    path: '/course',
    handler: function (request, reply) {
        let response = bookshelf.Courses.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'POST',
    path: '/course/new',
    handler: function (request, reply) {
        new bookshelf.Course({
            title: request.payload.title,
            prefix_id: request.payload.prefix_id,
            number: request.payload.prefix_id,
            active: request.payload.active,
            department_id: request.payload.department_id
        })
            .save().then(function (model) {
            //get database
            reply({statusCode: 200, method: "post", response: model})
        }).catch(function (error) {
            reply({statusCode: 500, err: error});
        });
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}',
    handler: function (request, reply) {
        let response = bookshelf.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: 'PUT',
    path: '/course/{course_id}/edit',
    handler: function (request, reply) {
        let response = bookshelf.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
        if (request.method == 'get'){
            reply(response);
        }
        if (request.method == 'put') {
            //do database transaction
            response = bookshelf.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
            reply(response);
        }
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}/section',
    handler: function (request, reply) {
        let response = bookshelf.Section.where('course_id', request.params.course_id).fetch();
        reply(response);
    }
});

//Department Routes
server.route({
    method: 'GET',
    path: '/department',
    handler: function (request, reply) {
        let response = bookshelf.Departments.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'GET',
    path: '/department/{department_id}',
    handler: function (request, reply) {
        let response = bookshelf.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
        reply(response);
    }
});


server.route({
    method: 'POST',
    path: '/department/new',
    handler: function (request, reply) {
        new bookshelf.Department({
            name: request.payload.name
        })
            .save().then(function (model) {
            //get database
            reply({statusCode: 200, method: "post", response: model})
        }).catch(function (error) {
            reply({statusCode: 500, err: error});
        });
    }
});

server.route({
    method: 'PUT',
    path: '/department/{department_id}/edit',
    handler: function (request, reply) {
        let response = bookshelf.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
        if (request.method == 'get'){
            reply(response);
        }
        if (request.method == 'put') {
            //do database transaction
            response = bookshelf.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
            reply(response);
        }
    }
});

//Section Routes
server.route({
    method: 'GET',
    path: '/section',
    handler: function (request, reply) {
        let response = bookshelf.Sections.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'POST',
    path: '/section/new',
    handler: function (request, reply) {
        new bookshelf.Section({
            title: request.payload.title,
            reg_number: request.payload.reg_number,
            course_id: request.payload.course_id,
            term_id: request.payload.term_id
        })
            .save().then(function (model) {
            //get database
            reply({statusCode: 200, method: "post", response: model})
        }).catch(function (error) {
            reply({statusCode: 500, err: error});
        });
    }
});

server.route({
    method: 'GET',
    path: '/section/{section_id}',
    handler: function (request, reply) {
        let response = bookshelf.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: 'PUT',
    path: '/section/{section_id}/edit',
    handler: function (request, reply) {
        let response = bookshelf.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
        if (request.method == 'get'){
            reply(response);
        }
        if (request.method == 'post') {
            //do database transaction
            response = bookshelf.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
            reply(response);
        }
    }
});

//Prefix
server.route({
    method: 'GET',
    path: '/prefix',
    handler: function (request, reply) {
        let response = bookshelf.Prefixs.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'POST',
    path: '/prefix/new',
    handler: function (request, reply) {
        new bookshelf.Prefix({
            name: request.payload.name
        })
            .save().then(function (model) {
            //get database
            reply({statusCode: 200, method: "post", response: model})
        }).catch(function (error) {
            reply({statusCode: 500, err: error});
        });
    }
});

server.route({
    method: 'GET',
    path: '/prefix/{prefix_id}',
    handler: function (request, reply) {
        let response = bookshelf.Prefix.forge({'id': encodeURIComponent(request.params.prefix_id)}).fetch();
        reply(response);
    }
});

//Term
server.route({
    method: 'GET',
    path: '/term',
    handler: function (request, reply) {
        let response = bookshelf.Terms.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'POST',
    path: '/term/new',
    handler: function (request, reply) {
        new bookshelf.Term({
            name: request.payload.name,
            start_date: request.payload.start_date,
            end_date: request.payload.end_date
        })
            .save().then(function (model) {
            //get database
            reply({statusCode: 200, method: "post", response: model})
        }).catch(function (error) {
            reply({statusCode: 500, err: error});
        });
    }
});

server.route({
    method: 'GET',
    path: '/term/{term_id}',
    handler: function (request, reply) {
        let response = bookshelf.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: 'PUT',
    path: '/term/{term_id}/edit',
    handler: function (request, reply) {
        let response = bookshelf.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
        if (request.method == 'get'){
            reply(response);
        }
        if (request.method == 'post') {
            //do database transaction
            response = bookshelf.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
            reply(response);
        }
    }
});

//Serving static content
// server.register(require('inert'), (err) => {
//
//     if (err) {
//         throw err;
//     }
//
//     server.route({
//         method: 'GET',
//         path: '/my_css',
//         handler: function (request, reply) {
//             reply.file('./server/static/special_style.css');
//         }
//     });
// });

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