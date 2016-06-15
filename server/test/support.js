module.exports = {
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
