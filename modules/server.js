// requirements
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    apiServer = require('./apiServer'),
    fileServer = require('./fileServer'),
    qs = require('querystring');
    express = require('express');

var app = express();

app.get('/api/*', function (req, res) {
  //console.log(req);
  var uri = req._parsedUrl.path
  apiServer(uri, req, res);
});

module.exports = app;
//module.exports = http.createServer(function (req, res) { ;
//    var uri = url.parse(req.url).pathname,
//        file = path.join(process.cwd(), uri);
//    //route /api calls to api server
//    if (uri.split('/')[1] === 'api') {
//        apiServer(uri, req, res);
//    } else {
//        fileServer(file, uri, req, res);
//    }
//});
