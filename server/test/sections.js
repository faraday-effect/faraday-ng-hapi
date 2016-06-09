"use strict";

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const db = require('../db');

const Section = require('../models/Section');

let server = null;
lab.before((done) => {
    require('../server')((err, srv) => {
        server = srv;
        done();
    })
});

lab.experiment('/sections endpoint', () => {

    lab.beforeEach(done => {
        return Promise.all([
            db.knex.raw('TRUNCATE student CASCADE'),
            db.knex.raw('TRUNCATE section CASCADE')
        ]).then(results => {
            console.log("TRUNCATED");

            return Promise.all([
                Section.query().insert({
                    id: 1, reg_number: 'REG111', title: 'Section 1' }),
                Section.query().insert({
                    id: 2, reg_number: 'REG222', title: 'Section 2' })
            ])
        }).then(results => {
            console.log('INSERTED')
        }).catch(err => {
            console.log("ERROR", err)
        });

        done();
    });

    lab.test('There are 10 sections', (done) => {
        server.inject(
            {
                method: 'GET',
                url: '/sections',
                credentials: {}
            }, (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.have.length(10);
                done();
            })
    });

    lab.test('Section 1 is the foundations class', (done) => {
        server.inject(
            {
                method: 'GET',
                url: '/sections/1',
                credentials: {}
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.course.number).to.equal('121');
                expect(response.course.title).to.equal('Foundations of Computer Science');
                done();
            })
    });

    lab.test('Abram is the only student in section 1', (done) => {
        server.inject(
            {
                method: 'GET',
                url: '/sections/1/students',
                credentials: {}
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.have.length(1);
                expect(response[0].first_name).to.equal('Abram');
                done();
            })
    });

})
;
