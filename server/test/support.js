"use strict";

/**
 * Set-up code for HAPI testing.  Use it like this:
 *
 * import { lab, expect, server } from './support';
 * exports.lab = lab;
 *
 * lab.experiment(...);
 *
 * Apparently, hapi-lab requires that the test file itself export
 * the lab object itself to run properly.
 */

// Test framework
const Lab = require('lab');
export const lab = Lab.script();

// Assertion library
const Code = require('code');
export const expect = Code.expect;

// Server initialization (before all tests)
const Server = require('../server');
export let server = null;
lab.before((done) => {
    Server((err, srv) => {
        server = srv;
        console.log("Server initialized");
        done();
    })
});

// Database connection
export const db = require('../db');
