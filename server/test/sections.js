"use strict";

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

let server = null;

lab.before((done) => {
    require('../server')((err, srv) => {
        server = srv;
        done();
    })
});

lab.test('I am true', (done) => {
    expect(true).to.be.true();
    done();
});

lab.experiment('/sections endpoint', () => {

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
    
});
