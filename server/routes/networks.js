/**
 * Created by Nahuel Barrios on 22/05/15.
 */

var express = require('express');
var router = express.Router();

// ======================
// Self modules
// ======================

/**
 * It's the networks service.
 * @type {exports|module.exports}
 */
var service = require('../services/networks_service');

// ======================
// Mappings...
// ======================

router.get('/', function (req, res, next) {
    res.send(service.findAll());
});

module.exports = router;
