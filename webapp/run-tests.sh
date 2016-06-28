#!/bin/sh
set -e
cd ../server
npm install
./node_modules/.bin/knex migrate:latest
node start.js &
sleep 3
cd ../webapp
npm install
./node_modules/.bin/ng e2e
