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
        test.equal(data.length, 1, 'Response should have 1 items');

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
