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

// Setup client with automatic tests on each response
var api = require('nodeunit-httpclient').create({
    port: 3000,
    path: '',       // Base URL for requests
    status: 200,    // Test each response is OK (can override later)
    headers: {      // Test that each response must have these headers (can override later)
        'content-type': 'application/json; charset=utf-8'
    }
});

exports.testQuantityOfNetworks = function (test) {
    api.get(test, '/networks', function (response) {
        var data = response.data;

        test.ok(data, 'Response must be a true value');

        var desiredQuantity = 4;
        test.equal(data.length, desiredQuantity, 'Response should have ' + desiredQuantity + ' items');

        test.done();
    });
};

exports.testNetworksAttributes = function (test) {
    api.get(test, '/networks', function (response) {
        var data = response.data;
        test.ok(data, 'Response must be a true value');

        for (var i = 0; i < data.length; i++) {
            var eachNetwork = data[i];

            var message = 'Network at position ' + i + ' ';
            test.ok(eachNetwork.id, message + 'must have an ID');
            test.ok(eachNetwork.name, message + 'must have a name');
            test.ok(eachNetwork.url, message + 'must have an URL');
            test.ok(eachNetwork.logo_url, message + 'must have a logo URL');
        }

        test.done();
    });
};
