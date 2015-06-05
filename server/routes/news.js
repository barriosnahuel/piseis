/**
 * Created by Nahuel Barrios on 27/05/15.
 */

var express = require('express');
var router = express.Router();

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
    }

});

module.exports = router;
