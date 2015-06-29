/*
 * PiSeis - What people around the world is saying, you've got it.
 *  Copyright (C) 2013 Nahuel Barrios <barrios.nahuel@gmail.com>.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var defaultConfig = require('./development.json');

var routes = require('./routes/index');
var networks = require('./routes/networks');
var news = require('./routes/news');

var app = express();

var environment = app.get('env');
console.log("Running server in '%s' mode", environment);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO: Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger(process.env.REQUEST_LOG_MODE || defaultConfig.request_log_mode || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/demo', express.static(path.resolve('../demo')));
app.use('/jquery-plugin', express.static(path.resolve('../jquery-plugin')));

//===============
// Main resources mappings.
app.use('/', routes);
app.use('/networks', networks);
app.use('/news', news);

//===============
// Error handlers

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    var err = new Error('Wow! Check the URL because we currently does NOT support that resource.');
    err.status = 404;
    next(err);
});

if ('development' === environment) {
    app.use(function (err, req, res, next) {
        // Development error handler, it will print stacktrace

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    //  'production' environment
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    if (process.env.ROLLBAR_ACCESS_TOKEN) {
        var rollbar = require('rollbar');
        rollbar.handleUncaughtExceptions(process.env.ROLLBAR_ACCESS_TOKEN);
        app.use(rollbar.errorHandler());
        console.log('Rollbar configured successfully');
    } else {
        console.error('Running %s mode without ROLLBAR_ACCESS_TOKEN environment variable', environment);
    }
}

module.exports = app;
