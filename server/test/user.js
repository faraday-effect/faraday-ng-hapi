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
                    campus_id: '123456700',
                    password: '$2a$10$UzIsxXsVTPTru5NjfSXy.uGiptYgFmtfNrYCU9BzjIp2YEEXLUCGG'
                },
        	    {
                    first_name: "Sammy",
                    last_name: "Morris",
                    email: 'sam@example.com',
                    campus_id: '987654321',
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
        const user_id = users[0].id;
        
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
                    first_name: 'Milo',
                    last_name: 'Rediger',
                    email: 'milo@example.com',
                    password: 'pass',
                    campus_id: '123456789',
                    mobile_phone: '0123456789',
                    office_phone: '0123456789'
                }
            },
            (res) => {
                //expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                console.log(response);
                expect(response.first_name).to.equal('Milo');
                expect(response.last_name).to.equal('Rediger');
                expect(response.email).to.equal('milo@example.com');
                expect(response.campus_id).to.equal('123456789');
                expect(response.mobile_phone).to.equal('0123456789');
                expect(response.office_phone).to.equal('0123456789');
                expect(response.password).to.be.undefined();
                done();
            })
    });

});

