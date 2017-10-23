var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');

// Get our API
var api = require('./routes/index');
var users = require('./routes/users');
var album = require('./routes/album');
var photos = require('./routes/photo');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Point static path at dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
   res.header('Access-Control-Allow', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Methods', 'Content-Type, Authorization');
   next();
});

// Set our api routes
app.use('/api', api);

app.use('/api/users', users);
app.use('/api/albums', album);
app.use('/api/photos', photos);

/*app.use(expressJwt({
   secret: config.secret,
   getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
         return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
         return req.query.token;
      }
      return null;
   }
}).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));*/

/*app.use(function (err, req, res, next) {
   if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
         success: false,
         message: 'No token provided.'
      });
   }
});*/

// Catch all other routes and return index.html
app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express
 * */
var port = process.env.PORT || 9980;
app.set('port', port);

/**
 * Create HTTP server
 * */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 * */
server.listen(port, function () {
   console.log('API running on localhost:', port);
});

module.exports = app;
