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

org.nbempire.js.piseis.socialnetworks = (function () {

    // TODO : Move this!!
    var API_ENDPOINT = 'http://localhost:3000';

    var findNews = function (onError, onSuccess, options) {

        $.ajax({
            dataType: "jsonp",
            url: API_ENDPOINT + '/news',
            data: {
                q: options.query
                , excludedNetworks: options.excludeNetworks.join(',')
            }
        }).fail(onError)
            .done(onSuccess);
    };

    return {
        findNews: findNews
    }
}());

