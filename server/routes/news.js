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

/**
 * Created by Nahuel Barrios on 27/05/15.
 */

var express = require('express');
var router = express.Router();
var ua = require('universal-analytics');
var defaultConfig = require('../development.json');
var analyticsTracker = ua(defaultConfig.analytics.trackingId);

// ======================
// Self modules
// ======================

/**
 * It's the news service.
 * @type {exports|module.exports}
 */
var service = require('../services/news_service');

// ======================
// Mappings...
// ======================

router.get('/', function (req, res, next) {

    var callback = function (err, result) {
        if (err) {
            res.jsonp(err.statusCode, err.message);
        } else {
            res.jsonp(result);
        }
    };

    var query = req.query.q;
    if (!query) {
        callback({statusCode: 400, message: 'Must send a query ("q") parameter.'});
    } else {
        service.findAll(query, req.query.excludedNetworks, callback);

        if (express().get('env') === 'production') {
            analyticsTracker.event('search', 'news', query).send();

            for (var i = 0; req.query.excludedNetworks && i < req.query.excludedNetworks.length; i++) {
                analyticsTracker.event('search', 'exclude-network', req.query.excludedNetworks[i]).send();
            }
        }
    }

});

module.exports = router;
