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
 * Created by Nahuel Barrios <barrios.nahuel@gmail.com>.
 * Created on 11/30/13, at 3:15 PM.
 */
var org = org || {};
org.nbempire = org.nbempire || {};
org.nbempire.js = org.nbempire.js || {};
org.nbempire.js.piseis = org.nbempire.js.piseis || {};

org.nbempire.js.piseis.news = (function () {

    var findByQuery = function (onError, onSuccess, options) {
        console.log('Start looking for: ' + options.query + ' (excluding ' + options.excludeNetworks.length + ' networks)');

        var querystring = {};
        querystring.q = options.query;
        if (options.excludeNetworks.length > 0) {
            querystring.excludedNetworks = options.excludeNetworks.join(',');
        }

        org.nbempire.js.piseis.get(onError, onSuccess, '/news', querystring);
    };

    return {
        findByQuery: findByQuery
    }
}());

