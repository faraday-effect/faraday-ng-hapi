"use strict";

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const db = require('../db');

const Section = require('../models/Section');
const Person = require('../models/Person');
const Course = require('../models/Course');
const Term = require('../models/Term');

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
            db.knex.raw('TRUNCATE course CASCADE'),
            db.knex.raw('TRUNCATE student CASCADE'),
            db.knex.raw('TRUNCATE section CASCADE')
        ]).then(results => {
            return Term.query().insertAndFetch({
                name: 'Fall 2016',
                start_date: '2016-09-01',
                end_date: '2016-12-15'
            })
        }).then(term => {
            console.log("TERM", term);
            return Promise.all([
                Course.query().insertWithRelated({
                    number: '121',
                    title: 'Foundations of Computer Science',
                    offerings: [{
                        term_id: term.id,
                        sections: [
                            {title: 'Section 1', reg_number: 'REG111'},
                            {title: 'Section 2', reg_number: 'REG222'}
                        ]
                    }]
                }),
            ])
        }).then(results => {
            return Promise.all([
                Section.query().insert({id: 1, reg_number: 'REG111', title: 'Section 1'}),
                Section.query().insert({id: 2, reg_number: 'REG222', title: 'Section 2'})
            ])
        }).then(results => {
            return Promise.all([
                Person.query().insert({
                    first_name: "Patty",
                    last_name: "O'Furniture",
                    email: 'patty@example.com',
                    password: 'pass'
                }),
                Person.query().insert({
                    first_name: "Frank",
                    last_name: "Insense",
                    email: 'frank@example.com',
                    password: 'pass'
                }),
            ])
        }).catch(err => {
            console.log("ERROR", err)
        });

        done();
    });

    lab.test('There are 2 sections', (done) => {
        server.inject(
            {
                method: 'GET',
                url: '/sections',
                credentials: {}
            }, (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.have.length(2);
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

});

