"use strict";

import { init_test, expect, server, db } from './support';
const lab = exports.lab = init_test();

const User = require('../models/User');
const Section = require('../models/Section');
const ActualClass = require('../models/ActualClass');

lab.experiment('/attendance endpoint', () => {

    var section = null;
    var user = null;

    lab.beforeEach(done => {

        return Promise.all([
            db.knex.raw('TRUNCATE public.attendance CASCADE'),
            db.knex.raw('TRUNCATE public.user CASCADE'),
            db.knex.raw('TRUNCATE public.actual_class CASCADE'),
            db.knex.raw('TRUNCATE public.sequence CASCADE'),
            db.knex.raw('TRUNCATE public.section CASCADE'),
        ])
            .then(results => {
                return Promise.all([
                    User
                        .query()
                        .insert({
                            id: 1,
                            first_name: "Sammy",
                            last_name: "Morris",
                            email: 'sam@example.com',
                            mobile_phone: '0123456789',
                            office_phone: '0123456789',
                            password: 'pass'
                        }),
                    Section
                        .query()
                        .insertWithRelated({
                            title: 'Section xyz',
                            reg_number: '123456',
                            credit_hours: '3',
                            sequence: {
                                title: 'seq xyz',
                                offering: {
                                    course: {
                                        '#id': 'this_course',
                                        title: 'Course Title',
                                        number: '123',
                                        prefix: {
                                            name: 'COS'
                                        },
                                        department: {
                                            name: 'CSE Department'
                                        }
                                    }
                                },
                                actualClass: {
                                    id: 1,
                                    start_time: new Date()
                                }
                            },
                            course: {
                                '#ref': 'this_course'
                            },
                            term: {
                                name: 'Fall 2016',
                                start_date: '2016-09-01',
                                end_date: '2016-12-15'
                            }
                        })
                ])
            }).then(results => {
                user = results[0];
                section = results[1];

            })
            .catch(err => {
                console.log("ERROR", err);
            });

    });

    // No need to invoke done();  According to documentation,
    // you can return a promise instead.

    lab.test('Mark oneself as present to a class', (done) => {

        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/${section.id}/attendance`,
                payload: {
                    code: '000000'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist()
                expect(response.user_id).to.equal(user.id);
                expect(response.actual_class_id).to.equal(section.sequence.actualClass.id);
                expect(response.id).to.exist();
                expect(response.signed_in).to.exist();
                expect(response.signed_out).to.not.exist();
                done();
            });
    });

    lab.test('Error out if section is not found', (done) => {

        server.inject(
            {
                method: 'DELETE',
                credentials: user,
                url: `/sections/100000000/attendance`,
                payload: {
                    code: '000000'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Section ID 100000000 was not found!');
                done();
            });
    });

    lab.test('Error out if section is not found', (done) => {

        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/100000000/attendance`,
                payload: {
                    code: '000000'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Section ID 100000000 was not found!');
                done();
            });
    });

    lab.test('Error out on a double sign in to a class', (done) => {

        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/${section.id}/attendance`,
                payload: {
                    code: '000000'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist()
                expect(response.user_id).to.equal(user.id);
                expect(response.actual_class_id).to.equal(section.sequence.actualClass.id);
                expect(response.id).to.exist();
                expect(response.signed_in).to.exist();
                expect(response.signed_out).to.not.exist();
                server.inject(
                    {
                        method: 'POST',
                        credentials: user,
                        url: `/sections/${section.id}/attendance`,
                        payload: {
                            code: '000000'
                        }
                    },
                    (res) => {
                        expect(res.statusCode).to.equal(400);
                        const response = JSON.parse(res.payload);
                        expect(response.error).to.equal('Bad Request');
                        expect(response.message).to.equal('You already are listed as present for this class!');
                        done();
                    });
            });
    });

    lab.test('Error out with wrong code', (done) => {

        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/${section.id}/attendance`,
                payload: {
                    code: '000111'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Bad Request');
                expect(response.message).to.equal('Your attendance code is invalid!');
                done();
            });
    });

    lab.test('Error out class not in session', (done) => {

        ActualClass
            .query()
            .deleteById(section.sequence.actualClass.id)
            .then(() => {
                server.inject(
                    {
                        method: 'POST',
                        credentials: user,
                        url: `/sections/${section.id}/attendance`,
                        payload: {
                            code: '000000'
                        }
                    },
                    (res) => {
                        expect(res.statusCode).to.equal(400);
                        const response = JSON.parse(res.payload);
                        expect(response.error).to.equal('Bad Request');
                        expect(response.message).to.equal('Your professor has not started class yet!');
                        done();
                    });
            });
    });

    lab.test('Error out class already ended', (done) => {

        ActualClass
            .query()
            .deleteById(section.sequence.actualClass.id)
            .then(() => {
                server.inject(
                    {
                        method: 'DELETE',
                        credentials: user,
                        url: `/sections/${section.id}/attendance`,
                        payload: {
                            code: '000000'
                        }
                    },
                    (res) => {
                        expect(res.statusCode).to.equal(400);
                        const response = JSON.parse(res.payload);
                        expect(response.error).to.equal('Bad Request');
                        expect(response.message).to.equal('Class has already ended!');
                        done();
                    });
            });
    });

    lab.test('Mark oneself as signed_out from a class', (done) => {

        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/${section.id}/attendance`,
                payload: {
                    code: '000000'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist()
                expect(response.user_id).to.equal(user.id);
                expect(response.actual_class_id).to.equal(section.sequence.actualClass.id);
                expect(response.id).to.exist();
                expect(response.signed_in).to.exist();
                expect(response.signed_out).to.not.exist();

                server.inject(
                    {
                        method: 'DELETE',
                        credentials: user,
                        url: `/sections/${section.id}/attendance`
                    },
                    (res2) => {
                        expect(res2.statusCode).to.equal(200);
                        const response = JSON.parse(res2.payload);
                        expect(response.id).to.exist()
                        expect(response.user_id).to.equal(user.id);
                        expect(response.actual_class_id).to.equal(section.sequence.actualClass.id);
                        expect(response.id).to.exist();
                        expect(response.signed_in).to.exist();
                        expect(response.signed_out).to.exist();
                        done();
                    });
            });
    });

        lab.test('Error out if you are not marked as present', (done) => {

        server.inject(
            {
                method: 'DELETE',
                credentials: user,
                url: `/sections/${section.id}/attendance`,
            },
            (res) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Bad Request');
                expect(response.message).to.equal('You are not marked as present for this class!');
                done();
            });
    });
});