/**
 * Created by Nahuel Barrios on 27/05/15.
 */
var API_ENDPOINT = 'http://api.flickr.com/services/feeds/photos_public.gne';

var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

var networks = require('./../networks_service');

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
                author.url = 'https://flickr.com/photos/' + item.author_id;
            }
            //author.picture = item.user.profile_picture;

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
        result.source = networks.getFlickrDisplayName();

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
