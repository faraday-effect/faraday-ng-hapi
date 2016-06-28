#!/bin/sh
set -e
cd ../server
npm install
./node_modules/.bin/knex migrate:latest
node start.js &
cd ../webapp
npm install
./node_modules/.bin/ng serve &
sleep 5
./node_modules/.bin/ng e2e
