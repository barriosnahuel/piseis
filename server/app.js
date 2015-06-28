var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//if(process.env.) {
//    var rollbar = require('rollbar');
//}

var routes = require('./routes/index');
var networks = require('./routes/networks');
var news = require('./routes/news');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(rollbar.errorHandler('77903316e7c443008777de91e9052f25'));

//===============
// Main resources mappings.
app.use('/', routes);
app.use('/networks', networks);
app.use('/news', news);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Wow! Check the URL because we currently does NOT support that resource.');
    err.status = 404;
    next(err);
});

//===============
// Error handlers

// Development error handler, it will print stacktrace
var environment = app.get('env');

console.log("running server in '%s' mode", environment);

if ('development' === environment) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler, no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
