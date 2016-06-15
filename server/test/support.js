module.exports = {

    Code : require('code'),
    expect : Code.expect,
    Lab : require('lab'),
    lab : exports.lab = Lab.script(),
    db : require('../db'),

    startServer: function (lab, server) {
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
