module.exports = {

    Code : require('code'),
    expect : require('code').expect,
    Lab : require('lab'),
    lab : exports.lab = require('lab').script(),
    db : require('../db'),
    server: null,

    startServer: function () {
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
