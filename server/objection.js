"use strict";

var knex = require('knex')({
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

const Model = require('objection').Model;
Model.knex(knex);

const Section = require('./models/Section');

Section
    .query()
    .where('id', 1)
    .first()
    .then((section) => {
        console.log("SECTION", section.title);
        return section.$relatedQuery('students');
    })
    .then((students) => {
        students.forEach((student) =>
            console.log(`STUDENT: ${student.first_name} ${student.last_name} (${student.email})`));
    })
    .catch((err) => console.error("ERROR", err))
    .finally(() => process.exit(0));
