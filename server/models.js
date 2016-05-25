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
