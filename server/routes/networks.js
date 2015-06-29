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
    res.jsonp(service.findAll());
});

module.exports = router;
