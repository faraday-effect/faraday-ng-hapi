'use strict';

/**
 * Sample test set up.
 */

import { lab, expect, server } from './support';
exports.lab = lab;

lab.experiment('all truth', () => {

    lab.test('True is true', done => {
        expect(true).to.be.true();
        done();
    });

    lab.test('False is not true', done => {
        expect(false).to.be.false();
        done();
    });

    lab.test('Ping says pong', done => {
        server.inject(
            {
                method: 'GET',
                url: '/ping',
                credentials: {}
            }, (res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.payload).to.equal('pong');
                done();
            })
    });

});

