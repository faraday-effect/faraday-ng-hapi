'use strict';

import { init_test, expect, server, db } from './support';
const lab = exports.lab = init_test();

const User = require('../models/User');
const Prefix = require('../models/Prefix');

lab.experiment('/Department endpoint', () => {

    var prefix = null;
    var user = null;

    lab.beforeEach(done => {

        return Promise.all([
            db.knex.raw('TRUNCATE public.user CASCADE'),
            db.knex.raw('TRUNCATE public.prefix CASCADE'),
            db.knex.raw('TRUNCATE public.department CASCADE'),
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
                    Prefix
                        .query()
                        .insertWithRelated([
                            {
                                name: 'COS',
                                department: {
                                    name: 'Computer Science & Engineering'
                                },
                            },
                            {
                                name: 'BIB',
                                department: {
                                    '#id': 'bisecp',
                                    name: 'Biblical Studies, Christian Education, & Philosophy'
                                }
                            },
                            {
                                name: 'REL',
                                department: {
                                    '#ref': 'bisecp'
                                }
                            }
                        ])
                ])
            }).then(results => {
                user = results[0];
                prefix = results[1];
            });
    });

    // No need to invoke done();  According to documentation,
    // you can return a promise instead.

    lab.test('List all prefixes successfully', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/prefixes`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.be.instanceOf(Array);
                expect(response).to.have.length(3);
                expect(response[0].id).to.equal(prefix[0].id);
                expect(response[0].name).to.equal(prefix[0].name);
                done();
            });
    });

    lab.test('Get a single prefix successfully', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/prefixes/${prefix[0].id}`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.equal(prefix[0].id);
                expect(response.name).to.equal(prefix[0].name);
                done();
            });
    });

    lab.test('Error out when a term_id does not exist when retreiving a single term', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/prefixes/1000000000`
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Prefix ID 1000000000 was not found!');
                done();
            });
    });

    lab.test('Create a new prefix successfully', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/prefixes`,
                payload: {
                    name: 'new'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.name).to.equal('new');
                done();
            });
    });

    lab.test('Updates a prefix successfully', (done) => {
        server.inject(
            {
                method: 'PUT',
                credentials: user,
                url: `/prefixes/${prefix[0].id}`,
                payload: {
                    name: 'EDT'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.id).to.equal(prefix[0].id);
                expect(response.name).to.equal('EDT');
                done();
            });
    });

    lab.test('List all departments successfully', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/departments`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.be.instanceOf(Array);
                expect(response).to.have.length(2);
                expect(response[0].id).to.equal(prefix[0].department.id);
                expect(response[0].name).to.equal(prefix[0].department.name);
                done();
            });
    });

    lab.test('Get a single department', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/departments/${prefix[0].department.id}`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.equal(prefix[0].department.id);
                expect(response.name).to.equal(prefix[0].department.name);
                done();
            });
    });

    lab.test('Error out when a department_id does not exist when retreiving a single department', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: '/departments/1000000000'
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Department ID 1000000000 was not found!');
                done();
            });
    });

    lab.test('Create a new department successfully', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/departments`,
                payload: {
                    name: 'new department',
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.name).to.equal('new department');
                done();
            });
    });

        lab.test('Updates a department successfully', (done) => {
            console.log(prefix[0].department);
        server.inject(
            {
                method: 'PUT',
                credentials: user,
                url: `/departments/${prefix[0].department.id}`,
                payload: {
                    name: 'edited department',
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.id).to.equal(prefix[0].department.id);
                expect(response.name).to.equal('edited department');
                done();
            });
    });
});
