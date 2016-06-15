"use strict";

const support = require('./support');

const User = require('../models/User');

support.startServer();

support.lab.experiment('/login endpoint', () => {

    var users = null;

    support.lab.beforeEach(done => {

        return Promise.all([
            support.db.knex('user').del()
        ]).then(results => {
            return Promise.all([
                User.query().insertWithRelated([{
                    first_name: "Patty",
                    last_name: "O'Furniture",
                    email: 'patty@example.com',
                    password: '$2a$10$UzIsxXsVTPTru5NjfSXy.uGiptYgFmtfNrYCU9BzjIp2YEEXLUCGG'
                },
        	    {
                    first_name: "Sammy",
                    last_name: "Morris",
                    email: 'sam@example.com',
                    password: '$2a$10$UzIsxXsVTPTru5NjfSXy.uGiptYgFmtfNrYCU9BzjIp2YEEXLUCGG',
                    mobile_phone: '0123456789',
                    office_phone: '0123456789'
                }])
                .then((collection) => {
                    users = collection;
                })
            ]);
        }).catch(err => {
            console.log("ERROR", err);
        });

    });

    // No need to invoke done();  According to documentation,
    // you can return a promise instead.

    support.lab.test('Log in passes', (done) => {

        support.server.inject(
            {
                method: 'POST',
                url: '/login',
                payload: {
                    email: 'patty@example.com',
                    password: 'pass',
                }
            },
            (res) => {
                support.expect(res.statusCode).to.equal(200);
                const header = res.headers['set-cookie'].toString();
                const response = JSON.parse(res.payload);
                support.expect(header).startsWith('faraday-cookie=');
                support.expect(response.id).to.equal(users[0].id);
                support.expect(response.first_name).to.equal('Patty');
                support.expect(response.last_name).to.equal('O\'Furniture');
                support.expect(response.email).to.equal('patty@example.com');
                done();
            });
    });

    support.lab.test('Log out passes', (done) => {

        support.server.inject(
            {
                method: 'POST',
                url: '/login',
                payload: {
                    email: 'patty@example.com',
                    password: 'pass',
                }
            },
            (res) => {
                const header = res.headers['set-cookie'];
                support.expect(header.length).to.equal(1);
                const cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

                support.server.inject(
                    {
                        method: 'POST',
                        url: '/logout',
                        headers: { cookie: 'faraday-cookie=' + cookie[1] }
                    },
                    (res2) => {
                        support.expect(res2.statusCode).to.equal(200);
                        const response = JSON.parse(res2.payload);
                        const cookie = res2.headers['set-cookie'].toString().split('; ');
                        support.expect(response.message).to.equal('Logout successful');
                        support.expect(cookie[2]).to.equal('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
                        support.expect(response.success).to.equal(true);
                        done();
                });
            });
    });

    support.lab.test('Login fails with bad password', (done) => {
        server.inject(
            {
                method: 'POST',
                url: '/login',
                payload: {
                    email: 'sam@example.com',
                    password: 'badPassword',
                }
            },
            (res) => {
                support.expect(res.statusCode).to.equal(401);
                const response = JSON.parse(res.payload);
                support.expect(response.message).to.equal('Invalid password');
                done();
            });
    });

    support.lab.test('Login fails with email that does not exist in the database', (done) => {
        support.server.inject(
            {
                method: 'POST',
                url: '/login',
                payload: {
                    email: 'iDontExistInTheDatabase@example.com',
                    password: 'pass',
                }
            },
            (res) => {
                support.expect(res.statusCode).to.equal(401);
                const response = JSON.parse(res.payload);
                support.expect(response.message).to.equal('Invalid username or password');
                done();
            });
    });

    support.lab.test('Checks the current user route to make sure it returns the current user object', (done) => {
        var user = {
            id: '10000',
            first_name: "Milo",
            last_name: "Rediger",
            email: 'milo@example.com',
            mobile_phone: '0123456789',
            office_phone: '0123456789'
        };

        support.server.inject(
            {
                method: 'GET',
                url: '/login',
                credentials: user
            },
            (res) => {
                support.expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                support.expect(response.id).to.equal('10000');
                support.expect(response.first_name).to.equal('Milo');
                support.expect(response.last_name).to.equal('Rediger');
                support.expect(response.email).to.equal('milo@example.com');
                done();
            });
    });

    support.lab.test('Checks the current user route to make sure it returns 401 if not logged in', (done) => {
        var user = null;

        support.server.inject(
            {
                method: 'GET',
                url: '/login',
                credentials: user
            },
            (res) => {
                support.expect(res.statusCode).to.equal(401);
                const response = JSON.parse(res.payload);
                done();
            });
    });

});