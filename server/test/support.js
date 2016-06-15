global.Code = require('code');
global.expect = require('code').expect;
global.Lab = require('lab');
// global.lab = exports.lab = Lab.script();
global.db = require('../db');
// const lab = Lab.script();

module.exports = {

    server: null,
    // lab: lab,
    startServer: function (lab) {
    lab.before((done) => {
        require('../server')((err, srv) => {
            server = srv;
            server.start(() => {
                console.log('Server started for caching');
            });
            done();
        })
    });
    }
}
