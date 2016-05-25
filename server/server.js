'use strict';

const Hapi = require('hapi');
const Good = require('good');
var Models = require('./models.js');


const server = new Hapi.Server();
server.connection({ port: 3000});

server.register([require('vision'), require('inert'), { register: require('lout') }], function(err) {
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
        let response = Models.Courses.forge().fetch();
        reply(response);
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/new',
    handler: function (request, reply) {
        if(request.method == 'get') {
            reply({course: "new course"});
        }
        if(request.method == 'post') {
            reply({statusCode: 200, method: "post", course: "new course"})
        }
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}',
    handler: function (request, reply) {
        let response = Models.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: ['PUT', 'GET'],
    path: '/course/{course_id}/edit',
    handler: function (request, reply) {
        let response = Models.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
        if(request.method == 'get'){
            reply(response);
        }
        if(request.method == 'put'){
            //do database transaction
            response = Models.Course.forge({'id': encodeURIComponent(request.params.course_id)}).fetch();
            reply(response);
        }
    }
});

//Department Routes
server.route({
    method: 'GET',
    path: '/department',
    handler: function (request, reply) {
        let response = Models.Departments.forge().fetch();
        reply(response);
    }
});

server.route({
    method: 'GET',
    path: '/department/{department_id}',
    handler: function (request, reply) {
        let response = Models.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
        reply(response);
    }
});


server.route({
    method: ['POST', 'GET'],
    path: '/department/new',
    handler: function (request, reply) {
        if(request.method == 'get') {
            reply({course: "new department"});
        }
        if(request.method == 'post') {
            reply({statusCode: 200, method: "post", department: "new department"})
        }
    }
});

server.route({
    method: ['PUT', 'GET'],
    path: '/department/{department_id}/edit',
    handler: function (request, reply) {
        let response = Models.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
        if(request.method == 'get'){
            reply(response);
        }
        if(request.method == 'put'){
            //do database transaction
            response = Models.Department.forge({'id': encodeURIComponent(request.params.department_id)}).fetch();
            reply(response);
        }
    }
});

//Section Routes
server.route({
    method: 'GET',
    path: '/section',
    handler: function (request, reply) {
        let response = Models.Sections.forge().fetch();
        reply(response);
    }
});

server.route({
    method: ['GET', 'POST'],
    path: '/course/{course_id}/section/new',
    handler: function (request, reply) {
        if(request.method == 'get') {
            reply({section: "new section"});
        }
        if(request.method == 'post') {
            reply({statusCode: 200, method: "post", section: "new section"})
        }
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}/section/{section_id}',
    handler: function (request, reply) {
        let response = Models.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}/section',
    handler: function (request, reply) {
        let response = Models.Sections.forge({'course_id': encodeURIComponent(request.params.course_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: ['PUT', 'GET'],
    path: '/course/{course_id}/section/{section_id}/edit',
    handler: function (request, reply) {
        let response = Models.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
        if(request.method == 'get'){
            reply(response);
        }
        if(request.method == 'post'){
            //do database transaction
            response = Models.Section.forge({'id': encodeURIComponent(request.params.section_id)}).fetch();
            reply(response);
        }
    }
});

// server.route({
//     method: ['POST', 'GET'],
//     path: '/course/{course_id}/section/{section_id}/enroll',
//     handler: function (request, reply) {
//         reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " Enroll");
//     }
// });
//
// server.route({
//     method: ['POST', 'GET'],
//     path: '/course/{course_id}/section/{section_id}/unenroll',
//     handler: function (request, reply) {
//         reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " Unenroll");
//     }
// });

//Term
server.route({
    method: 'GET',
    path: '/term',
    handler: function (request, reply) {
        let response = Models.Terms.forge().fetch();
        reply(response);
    }
});

server.route({
    method: ['GET', 'POST'],
    path: '/term/new',
    handler: function (request, reply) {
        if(request.method == 'get') {
            reply({term: "new term"});
        }
        if(request.method == 'post') {
            reply({statusCode: 200, method: "post", course: "new term"})
        }
    }
});

server.route({
    method: 'GET',
    path: '/term/{term_id}',
    handler: function (request, reply) {
        let response = Models.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
        reply(response);
    }
});

server.route({
    method: ['PUT', 'GET'],
    path: '/term/{term_id}/edit',
    handler: function (request, reply) {
        let response = Models.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
        if(request.method == 'get'){
            reply(response);
        }
        if(request.method == 'post'){
            //do database transaction
            response = Models.Term.forge({'id': encodeURIComponent(request.params.term_id)}).fetch();
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