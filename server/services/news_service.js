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

    var callback = function (err, results) {
        var joinedResults = [];
        for (var i = 0; i < results.length; i++) {
            joinedResults = joinedResults.concat(results[i]);
        }

        console.log('Total results for query "%s": %d', query, joinedResults.length);
        sort(joinedResults);
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

    async.parallel(tasks, callback);
};
