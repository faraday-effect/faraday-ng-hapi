"use strict";

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.test('I am true', (done) => {
    expect(true).to.be.true();
    done();
});

