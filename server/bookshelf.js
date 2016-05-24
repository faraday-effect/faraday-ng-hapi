var knex = require('knex')({
    client: 'pg',
    connection: "postgres://faraday:password@localhost/faraday"
});

module.exports = require('bookshelf')(knex);
