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
 * Created on 11/5/13, at 11:34 PM.
 */

var org = org || {};
org.nbempire = org.nbempire || {};
org.nbempire.js = org.nbempire.js || {};

org.nbempire.js.piseis = (function () {

    var find = function (options) {
        console.log('Start looking for: ' + options.query + ' (excluding ' + options.excludeNetworks.length + ' networks)');

        var onError = function (data, textStatus, jqXHR) {
            console.log("An error occured while parsing %s: ", "Flickr", textStatus);
        };

        var onFlickrSuccess = function (data) {
            console.log("Flickr results found.");

            console.log("Parsed response:");
            console.dir(data);
        };

        if (options.excludeNetworks.indexOf('Flickr') < 0) {
            org.nbempire.js.piseis.socialnetworks.flickr.find(onError, onFlickrSuccess, options.query);
        }

        //  TODO : Functionality : find in Instagram

        //  TODO : Functionality : find in Google+

        //  TODO : Functionality : find in Twitter

        //  TODO : Functionality : find in Facebook

        //  TODO : Functionality : sort results by date
    };

    return {
        find: find
    };

}());

