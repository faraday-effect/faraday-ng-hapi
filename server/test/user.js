"use strict";

import { init_test, expect, server, db } from './support';
const lab = exports.lab = init_test();

const User = require('../models/User');

lab.experiment('/users endpoint', () => {

    let users = null;

    lab.beforeEach(done => {

        return Promise.all([
            db.knex('user').del()
        ]).then(results => {
            return Promise.all([
                User.query().insertWithRelated([
                    {
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
                url: `/users/${users[0].id}`,
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
                    first_name: 'Dee',
                    last_name: 'Hydration',
                    email: 'dee@example.com',
                    password: 'pass',
                    mobile_phone: '7655551111',
                    office_phone: '7655552222'
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.first_name).to.equal('Dee');
                expect(response.last_name).to.equal('Hydration');
                expect(response.email).to.equal('dee@example.com');
                expect(response.mobile_phone).to.equal('7655551111');
                expect(response.office_phone).to.equal('7655552222');
                expect(response.password).to.be.undefined();
                done();
            })
    });

});

