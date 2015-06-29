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
 * Created by Nahuel Barrios on 27/05/15.
 */
var API_ENDPOINT = 'http://api.flickr.com/services/feeds/photos_public.gne';

var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

var flickr = {
    id: 'flickr'
    , name: 'Flickr'
    , url: 'https://www.flickr.com/'
    , logo_url: 'https://s.yimg.com/pw/images/goodies/white-small-circle.png'
};

exports.getFlickr = function () {
    return flickr;
};

exports.findAll = function (query, next) {
    var queryStringParameters = querystring.stringify({
        tags: query
        , format: 'json'
        , tagmode: 'any'
        , nojsoncallback: 1
    });

    request({
        url: API_ENDPOINT + '?' + queryStringParameters
        , json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseResponse(body, next);
        } else {
            next(error);
        }
    });
};

var parseResponse = function (responseBody, next) {
    var result = [];

    /**
     * Parse the Flickr response to generate a piSeis response.
     * @param item A simple publication in Flickr response format to parse.
     * @returns {{}}
     */
    var parsePublication = function (item) {
        function parseAuthor(item) {

            function getUserNameFromAuthor(author) {
                return author.substring(author.indexOf('(') + 1, author.indexOf(')'));
            }

            var author = {};

            author.username = getUserNameFromAuthor(item.author);
            author.id = item.author_id;
            //author.name = ;

            author.profile = {};
            if (author.username) {
                author.profile.url = flickr.url + 'photos/' + item.author_id;
            }
            //author.profile.picture = item.user.profile_picture;

            return author;
        }

        function parsePreview(item) {
            var preview = {};

            //preview.thumbnail = ;
            preview.snippet = item.description;

            return preview;
        }

        function parseData(item) {
            var data = {};
            //data.content = item.caption.text;
            data.media = {};

            data.media = {
                image: {
                    medium: item.media.m
                }
            };

            return data;
        }

        var result = {};
        result.author = parseAuthor(item);
        result.preview = parsePreview(item);
        result.data = parseData(item);

        var dateMoment = moment(item.published);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();

        result.link = item.link;
        result.source = flickr.name;

        return result;
    };

    if (responseBody.items) {
        for (var i = 0; i < responseBody.items.length; i++) {
            result.push(parsePublication(responseBody.items[i]));
        }
    } else {
        // When the request fails for example when tags, tagmode and format is not present.
    }

    next(undefined, result);
};
