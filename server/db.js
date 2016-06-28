'use strict';

const knex = exports.knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'faraday',
        password: 'pass',
        database: 'faraday',
        charset: 'utf8'
    },
    debug: true
});

const Model = exports.Model = require('objection').Model;
Model.knex(knex);
