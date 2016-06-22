'use strict';

import { init_test, expect, server } from './support';
const lab = exports.lab = init_test();

lab.experiment('web sockets', () => {

    lab.test('Can connect', done => {
        server.inject(
            {
                method: 'GET',
                url: '/hello'
            }, res => {
                expect(res.payload).to.startWith('This is a confirmation');
                done();
            }
        )
    });

});
