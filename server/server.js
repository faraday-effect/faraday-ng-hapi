'use strict';

const Hapi = require('hapi');
const Good = require('good');
var Models = require('./models.js');


const server = new Hapi.Server();
server.connection({ port: 3000});

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'faraday',
        password: 'pass',
        database: 'faraday',
        charset: 'utf8'
    }
});
var Bookshelf = require('bookshelf')(knex);



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
        console.log(Models);
        let course = Models.Courses.forge().fetch();

        reply(course);
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/new',
    handler: function (request, reply) {
        reply("new course");
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}',
    handler: function (request, reply) {
        let course = Course.forge({id: request.params.id}).fetch();
        reply(course);
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/{course_id}/edit',
    handler: function (request, reply) {
        reply("course_id: " + encodeURIComponent(request.params.course_id) + " Edit");
    }
});

//Section Routes
server.route({
    method: 'GET',
    path: '/section',
    handler: function (request, reply) {
        reply("View alls sections");
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}/section/new',
    handler: function (request, reply) {
        reply("New Section of " + encodeURIComponent(request.params.course_id));
    }
});

server.route({
    method: 'GET',
    path: '/course/{course_id}/section/{section_id}',
    handler: function (request, reply) {
        reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " View Section");
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/{course_id}/section/{section_id}/edit',
    handler: function (request, reply) {
        reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " Edit Section");
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/{course_id}/section/{section_id}/enroll',
    handler: function (request, reply) {
        reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " Enroll");
    }
});

server.route({
    method: ['POST', 'GET'],
    path: '/course/{course_id}/section/{section_id}/unenroll',
    handler: function (request, reply) {
        reply("course_id: " + encodeURIComponent(request.params.course_id) + "section_id: " + encodeURIComponent(request.params.section_id)+ " Unenroll");
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