/*
"use strict";

var knex = require('knex')({
    client: 'pg',
    connection: "postgres://faraday:password@localhost/faraday",
    debug: true
});

// Department
console.log("Creating 'department' table");

knex.schema.dropTableIfExists('department').then(function(foo) {
    console.log(`Foo is ${foo}`)
});

knex.schema.withSchema('public').createTable('department', function(table) {
    table.increments();
    table.string('name');
    table.timestamps();
}).then(function(foo) {
    console.log(`Foo is ${foo}`);
});

process.exit(0);
 */
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'faraday',
        password: 'pass',
        database: 'faraday',
        charset: 'utf8'
    }
});
var Bookshelf = require('bookshelf')(knex);


//Models

//Department
var Department = Bookshelf.Model.extend({
    tableName: 'department',
    course: function () {
        return this.hasMany(Course);
    }
});

//Course
var Course = Bookshelf.Model.extend({
    tableName: 'course',
    department: function () {
        return this.belongsTo(Department);
    },
    section: function () {
        return this.hasMany(Section);
    }
});

//Section
var Section = Bookshelf.Model.extend({
    tableName: 'section',
    course: function () {
        return this.belongsTo(Course);
    },
    term: function () {
        return this.belongsTo(Term);
    }
});

//Term
var Term = Bookshelf.Model.extend({
    tableName: 'term',
    section: function () {
        return this.hasMany(Section);
    }
});

//Collections
var Departments = Bookshelf.Collection.extend({
    model: Department
});

var Courses = Bookshelf.Collection.extend({
    model: Course
});

var Sections = Bookshelf.Collection.extend({
    model: Section
});

var Terms = Bookshelf.Collection.extend({
    model: Term
});