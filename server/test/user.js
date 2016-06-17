"use strict";

import { lab, expect, server, db } from './support';
exports.lab = lab;

const User = require('../models/User');

lab.experiment('/users endpoint', () => {

    let users = null;

    lab.beforeEach(done => {

            return Promise.all([
                db.knex('user').del()
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

    lab.test('There are a known number of users', (done) => {
        server.inject(
            {
                method: 'GET',
                url: '/users',
                credentials: {}
            }, (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.be.instanceOf(Array);
                expect(response).to.have.length(2);
                done();
            })
    });

    lab.test('One of the user objects is set correctly', (done) => {
        server.inject(
            {
                method: 'GET',
                url: `/users/${user_id}`,
                credentials: {}
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.first_name).to.equal('Patty');
                expect(response.last_name).to.equal('O\'Furniture');
                expect(response.email).to.equal('patty@example.com');
                expect(response.password).to.be.undefined();
                done();
            })
    });

        lab.test('Creates a new user correctly', (done) => {
        server.inject(
            {
                method: 'POST',
                url: '/users',
                credentials: {},
                payload: {
                    first_name: 'Sammy',
                    last_name: 'Morris',
                    email: 'sam@example.com',
                    password: 'pass',
                    mobile_phone: '0123456789',
                    office_phone: '0123456789'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.first_name).to.equal('Sammy');
                expect(response.last_name).to.equal('Morris');
                expect(response.email).to.equal('sam@example.com');
                expect(response.mobile_phone).to.equal('0123456789');
                expect(response.office_phone).to.equal('0123456789');
                expect(response.password).to.be.undefined();
                done();
            })
    });

});

