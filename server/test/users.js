"use strict";

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const db = require('../db');

const Section = require('../models/Section');
const User = require('../models/User');

let server = null;
lab.before((done) => {
    require('../server')((err, srv) => {
        server = srv;
        done();
    })
});

lab.experiment('/users endpoint', () => {

    lab.test('Users are members of sections', done => {
        server.inject(
            {
                method: 'GET',
                url: '/users/1/members',
                credentials: {}
            }, res => {
                expect(res.statusCode).to.equal(200);
                done();
            }
        )
    });

});

