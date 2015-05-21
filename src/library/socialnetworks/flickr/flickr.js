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

    var findNews = function (onError, onSuccess, keywords) {
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

        var tags = "", index;
        for (index = 0; index < keywords.length; index++) {
            tags.concat(keywords[index]).concat(',');
        }

        var parseResponse = function (data, textStatus, jqXHR) {
            console.log("Response to parse:");
            console.dir(data.items);

            var response = {};
            response.data = [];

            var parsePublication = function (item) {
                var result = {};

                var author = {};
                author.username = item.author;
                author.id = item.author_id;
                result.author = author;

                var preview = {};
                preview.snippet = item.description;
                result.preview = preview;

                var data = {};
                data.media = {
                    image: {
                        medium: item.media.m
                    }
                };
                result.data = data;

                result.date = item.published;
                result.link = item.link;

                return result;
            };

            for (var i = 0; i < data.items.length; i++) {
                response.data.push(parsePublication(data.items[i]));
            }

            onSuccess(response);
        };

        $.getJSON(url, {tags: tags, tagmode: 'any', format: 'json'})
            .fail(onError)
            .done(parseResponse);
    };

    return {
        find: findNews
    };

}());

