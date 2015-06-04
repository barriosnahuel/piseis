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

exports.findAll = function (onError, onSuccess, query) {

    var sort = function (data) {
        data = data.sort(function (a, b) {
            return b.date - a.date;
        });

        onSuccess({data: data});
    };

    var flickrTask = function (next) {
        flickr_service.findAll(query, next);
    };

    var instagramTask = function (next) {
        next(undefined, []);
    };

    var callback = function (err, results) {
        var joinedResults = [];
        for (var i = 0; i < results.length; i++) {
            joinedResults = joinedResults.concat(results[i]);
        }

        console.log('Total results for query "%s": %d', query, joinedResults.length);
        sort(joinedResults);
    };

    console.log('Looking for query: %s', query);
    async.parallel(
        [
            flickrTask,
            instagramTask
        ], callback);
};
