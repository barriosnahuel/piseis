/**
 * Created by Nahuel Barrios on 27/05/15.
 */

// ======================
// Self modules
// ======================

/**
 * It's the news service.
 * @type {exports|module.exports}
 */
var flickr_service = require('./networks/flickr_service');

exports.findAll = function (onError, onSuccess, query) {
    console.log('Looking for query: %s', query);

    flickr_service.findAll(onError, onSuccess, query);
};
