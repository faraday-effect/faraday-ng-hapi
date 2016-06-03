[![Build Status](https://travis-ci.org/faraday-effect/faraday.svg?branch=develop)](https://travis-ci.org/faraday-effect/faraday)

# faraday
Learning Management 2.0

# Prerequisites
`npm install -g knex angular-cli`

# Server

To Import Database Schema:
`knex migrate:latest`

To Import Database Data:
`knex seed:run`

To run server:
run `node server/server.js` in terminal

In a browser visit `localhost:3000`


To run express-admin:
run `node server/node_modules/express-admin server/express-admin`

In a browser visit: `localhost:5000`

User: admin
Pass: AdmiN123

# Client

To start webapp server (in `webapp` directory):
run `ng serve`

In a browser visit: `localhost:4200`
