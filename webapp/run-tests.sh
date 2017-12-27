#!/bin/sh
set -e
cd ../server
npm install
./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run
NES_DISABLE_HEARTBEAT=1 npm start &
cd ../webapp
npm install
npm start &
sleep 5
./node_modules/.bin/ng e2e
