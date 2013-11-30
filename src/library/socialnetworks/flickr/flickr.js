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
 * Created on 11/30/13, at 3:53 PM.
 */

var org = org || {};
org.nbempire = org.nbempire || {};
org.nbempire.js = org.nbempire.js || {};
org.nbempire.js.piseis = org.nbempire.js.piseis || {};
org.nbempire.js.piseis.socialnetworks = org.nbempire.js.piseis.socialnetworks || {};

org.nbempire.js.piseis.socialnetworks.flickr = (function () {

    var findNews = function (keywords, onSuccess) {
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

        var tags = "", index;
        for (index = 0; index < keywords.length; index++) {
            tags.concat(keywords[index]).concat(',');
        }

        //  TODO : Functionality : transform this into a jquery promise!!

        $.getJSON(url, {tags: tags, tagmode: 'any', format: 'json'}, onSuccess);
    };

    return {
        find: findNews
    };

}());

