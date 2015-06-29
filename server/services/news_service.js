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

var async = require('async');

// ======================
// Self modules
// ======================

/**
 * It's the news service.
 * @type {exports|module.exports}
 */
var flickr_service = require('./networks/flickr_service');
var instagram_service = require('./networks/instagram_service');
var twitter_service = require('./networks/twitter_service');
var gplus_service = require('./networks/googleplus_service');

exports.findAll = function (query, excludedNetworks, next) {

    var shouldSearchInNetwork = function (networkId, networks) {
        return !networks || networks.indexOf(networkId) < 0;
    };

    var flickrTask = function (next) {
        flickr_service.findAll(query, next);
    };

    var instagramTask = function (next) {
        instagram_service.findAll(query, next);
    };

    var twitterTask = function (next) {
        twitter_service.findAll(query, next);
    };

    var gplusTask = function (next) {
        gplus_service.findAll(query, next);
    };

    var callback = function (err, results) {
        if (err) {
            next(err);
        } else {
            var joinedResults = [];
            for (var i = 0; i < results.length; i++) {
                joinedResults = joinedResults.concat(results[i]);
            }

            console.log('Total results for query "%s": %d', query, joinedResults.length);
            sort(joinedResults);
        }
    };

    var sort = function (data) {
        data = data.sort(function (a, b) {
            return b.date - a.date;
        });

        next(undefined, {data: data});
    };

    console.log('Looking for query: %s', query);

    var tasks = [];
    if (shouldSearchInNetwork(twitter_service.getTwitter().id, excludedNetworks)) {
        tasks.push(twitterTask);
    }

    if (shouldSearchInNetwork(instagram_service.getInstagram().id, excludedNetworks)) {
        tasks.push(instagramTask);
    }

    if (shouldSearchInNetwork(flickr_service.getFlickr().id, excludedNetworks)) {
        tasks.push(flickrTask);
    }

    if (shouldSearchInNetwork(gplus_service.getGooglePlus().id, excludedNetworks)) {
        tasks.push(gplusTask);
    }

    async.parallel(tasks, callback);
};
