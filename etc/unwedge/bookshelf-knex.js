"use strict";

const Promise = require('bluebird');

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./test-db.sqlite"
    },
    debug: true,
    useNullAsDefault: true        // Quiet the sqlite3 driver
});

var bookshelf = require('bookshelf')(knex);

function reset_schema() {
    console.log("Reset schema");

    return Promise.join(
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('roles'),
        knex.schema.dropTableIfExists('roles_users'),
        () => console.log("Schema reset")
    );
}

function create_schema() {
    console.log("Create schema")

    return Promise.join(
        knex.schema.createTableIfNotExists('users', (table) => {
            table.increments();
            table.string('first_name');
            table.string('last_name');
            table.string('email');
        }),

        knex.schema.createTableIfNotExists('roles', (table) => {
            table.increments();
            table.string('name');
        }),

        knex.schema.createTableIfNotExists('roles_users', (table) => {
            table.integer('user_id').references('user.id');
            table.integer('role_id').references('role.id');
        }),

        () => console.log("Schema created")
    );
}

function insert_data() {
    console.log("Insert data");

    return Promise.join(
        knex('users').insert({id: 1, first_name: 'Fred', last_name: 'Ziffle', email: 'fred@ziffle.com'}),
        knex('users').insert({id: 2, first_name: 'Zelda', last_name: 'Ziffle', email: 'zelda@ziffle.com'}),
        knex('users').insert({id: 3, first_name: 'Patty', last_name: "O'Furniture", email: 'zelda@ziffle.com'}),

        knex('roles').insert({id: 10, name: 'President'}),
        knex('roles').insert({id: 11, name: 'Manager'}),
        knex('roles').insert({id: 12, name: 'VP'}),

        knex('roles_users').insert({user_id: 1, role_id: 10}),
        knex('roles_users').insert({user_id: 2, role_id: 11}),
        knex('roles_users').insert({user_id: 3, role_id: 11}),

        () => console.log("Data inserted")
    );
}

function build_orm() {
    console.log("Building ORM");

    var User = bookshelf.Model.extend({
        tableName: 'users'
    });

    var Role = bookshelf.Model.extend({
        tableName: 'roles'
    });
    console.log("ORM built");
}

reset_schema()
    .then(create_schema)
    .then(insert_data)
    .then(() => {
        build_orm();
        process.exit(1);
    });
