var models = require('./models'),
    http = require('http'),
    QM = require('./quoteManager');

module.exports = function apiServer(uri, req, res, callback) {

    //Good Request! Will be served!
    function goodRes (data, code, report) {
      if (code === undefined) code = 200;
      if (report) console.log(report);
      res.writeHead(code,
        { 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json' });
      res.write(JSON.stringify(data));
      res.end();
    }

    //Bad Request! Bad Bad Bad!
    function badRes (err, code) {
      if (code === undefined) code = 404
        res.writeHead(code);
        res.end();
        console.log(code + ': ' + err);
    }

    function postService ( managementFunction ) {
      if (req.method !== 'POST') return badRes('Method Not Allowed', 405);
      var body = '';
      req.on('data', function (data) {
        body += data;
        //end connection if flooded or bad connection
        if (body.length > 1e6) return badReq('Request Entity Too Large', 413);
      });
      req.on('end', function () {
        var POST = undefined
        body.length < 1 ? POST = {} : POST = JSON.parse(body);
        managementFunction(POST, function(err, data, message) {
          if (err) return badRes(err);
          goodRes(data, 200, data._id + ': ' + message);
          });
      });
    }

    var pathArray = uri.split('/');

    //toss bad calls
    if (pathArray === undefined) return badRes(new Error('the api shouldn\'t have been routed this bad request, undefined'));

    switch (pathArray[2]) {
        // find all quotes
        case 'quotes':
            models.quotes.find(function (err, quotes) {
                if (err) return badRes(err);
                console.log('served req for quotes');
                goodRes(quotes);
            });
            break;
        //find one random quote
        case 'random_quote':
            models.quotes.findOneRandom(function (err, quote) {
                if (err) return badRes(err);
                console.log('serverd req for random quote');
                goodRes(quote);
            });
            break;
        //find a quote with its ID
        case 'quote':
            var id = pathArray[3];
            if (id === undefined) {
                badRes(new Error('asked for single quote, but didn\'t provide ID like quote/ID'))
                break;
            }
            models.quotes.findOne({ '_id' : id }).exec( function (err, quote) {
                if (err) return badRes(err);
                console.log('served req for quote with id: ' + id );
                goodRes(quote);
            });
            break;
        case 'new_quote':
            postService( QM.newQuote );
            break;
        case 'del_quote':
          var id = pathArray[3];
          if (id === undefined) {
              badRes(new Error('asked for single quote, but didn\'t provide ID like del_quote/ID'))
              break;
          }
          models.quotes.remove({ _id : id }, function (err, quote) {
              if (err) return badRes(err);
              console.log('served req to del quote');
              goodRes(quote);
          })
          break;
        default:
            badRes(new Error('API could not return a because task value in url didn\'t match to a proper API call \(ie api/random_quote \)'));
            break;
    }
}
