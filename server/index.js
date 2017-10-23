var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Get our API
var api = require('./routes/index');
// var users = require('./routes/users');
// var album = require('./routes/album');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Point static path at dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
// app.use('/api/users', users);
// app.use('/api/album', album);

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
