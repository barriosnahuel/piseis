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
    var query = req.query.q;

    if (!query) {
        res.send(400, 'Must send a query ("q") parameter.');
    } else {
        res.send(service.findAll(query));
    }

});

module.exports = router;
