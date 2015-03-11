var expect = require('expect.js'),
    server = require('../modules/server'),
    config = require('../config'),
    http = require('http'),
    DM = require('../modules/databaseManager'),
    QM = require('../modules/quoteManager'),
    lh = 'http://192.168.1.44';

describe('TES Quotes API server', function () {

    before(function () {
        DM.connect( config.databaseUrl);
        server.listen( config.port, console.log('server connected at ' + config.port ));
    });

    after(function () {
        server.close();
        //process.exit();
    });

    //use apiPath such as /api/quotes, make sure to include '/' in front
    function testForApiConnections (apiPath, code) {
        it('should return '+code+' when GET to '+apiPath , function () {
            http.get( lh + ':' + config.port + apiPath, function (res) {
                expect(res).to.exist;
                expect(res.status).to.equal(code);
                //done();
            });
        });
    }

    testForApiConnections('/', 404);
    testForApiConnections('/api/quotes', 200);
    testForApiConnections('/api/random_quote', 200);
    testForApiConnections('/api/poem/id', 404);
});
