"use strict";

const support = require('./support');
const lab = exports.lab = Lab.script();

const Section = require('../models/Section');
const User = require('../models/User');
const Department = require('../models/Department');
const Course = require('../models/Course');

lab.experiment('/sections endpoint', () => {

    let foundations_section_id = null;

    lab.beforeEach(done => {
        return Promise.all([
            db.knex.raw('TRUNCATE public.user CASCADE'),
            db.knex.raw('TRUNCATE course CASCADE'),
            db.knex.raw('TRUNCATE term CASCADE')
        ]).then(results => {
            return Course.query().insertWithRelated({
                prefix: {
                    "name": "COS"
                },
                number: '121',
                title: 'Foundations of Computer Science',
                department: {
                    name: 'Computer Science and Engineering'
                },
                offerings: [{
                    term: {
                        name: 'Fall 2016',
                        start_date: '2016-09-01',
                        end_date: '2016-12-15'
                    },
                    sections: [
                        {
                            title: 'Section 1',
                            reg_number: 'REG111',
                            users: [
                                {
                                    first_name: "Patty",
                                    last_name: "O'Furniture",
                                    email: 'patty@example.com',
                                    password: 'pass'
                                },
                                {
                                    first_name: "Frank",
                                    last_name: "Insense",
                                    email: 'frank@example.com',
                                    password: 'pass'
                                }
                            ]

                        },
                        {title: 'Section 2', reg_number: 'REG222'}
                    ]
                }]
            })
        }).then(course => {
            foundations_section_id = course.offerings[0].sections[0].id;
        }).catch(err => {
            console.log("ERROR", err);
        });

        // No need to invoke done();  According to documentation,
        // you can return a promise instead.
    });

    lab.test('There are a known number of sections', (done) => {
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

    lab.test('One of the sections is for Foundations of CS', (done) => {
        server.inject(
            {
                method: 'GET',
                url: `/sections/${foundations_section_id}`,
                credentials: {}
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.offering.course.number).to.equal('121');
                expect(response.offering.course.title).to.equal('Foundations of Computer Science');
                done();
            })
    });

    lab.test('Patty is the only student in Foundations of CS', (done) => {
        server.inject(
            {
                method: 'GET',
                url: `/sections/${foundations_section_id}/students`,
                credentials: {}
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.have.length(1);
                expect(response[0].first_name).to.equal('Patty');
                done();
            })
    });

});

