#!/bin/sh
set -e
npm install
./node_modules/.bin/knex migrate:latest
node test
