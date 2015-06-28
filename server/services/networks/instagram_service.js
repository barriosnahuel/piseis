/**
 * Created by Nahuel Barrios on 27/05/15.
 */
var defaultConfig = require('./../../development.json');
var CLIENT_ID = process.env.NETWORK_INSTAGRAM_CLIENT_ID || defaultConfig.networks.instagram.client_id;

//  TODO : Functionality : Replace each meta character (tested with & and it fails) for something specific (or not) for Instagram API.
var API_ENDPOINT_PREFFIX = 'https://api.instagram.com/v1/tags/';
var API_ENDPOINT_SUFIX = '/media/recent';

var path = require('path');

var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

var instagram = {
    id: 'instagram'
    , name: 'Instagram'
    , url: 'https://www.instagram.com/'
    , logo_url: 'http://piseis.herokuapp.com/images/network_logo_instagram.png'
};

exports.getInstagram = function () {
    return instagram;
};

exports.findAll = function (query, next) {
    var queryStringParameters = querystring.stringify({
        client_id: CLIENT_ID
    });

    request({
        url: API_ENDPOINT_PREFFIX + query + API_ENDPOINT_SUFIX + '?' + queryStringParameters
        , json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseResponse(body, next);
        } else {
            next(error);
        }
    });
};

var parseResponse = function (data, next) {
    var result = [];

    var parsePublication = function (item) {

        function parseAuthor(item) {
            var author = {};

            author.username = item.user.username;
            author.name = item.user.full_name;
            author.id = item.user.id;

            author.profile = {};
            if (author.username) {
                author.profile.url = instagram.url + author.username;
            }
            author.profile.picture = item.user.profile_picture;

            return author;
        }

        function parsePreview(item) {
            var preview = {};

            if (item.type === 'image') {
                preview.thumbnail = item.images.thumbnail;
            }

            preview.snippet = item.caption.text;

            return preview;
        }

        function parseData(item) {
            var data = {};
            data.content = item.caption.text;
            data.media = {};

            if (item.type === 'image') {
                data.media.image = {
                    low: item.images.low_resolution.url
                    , medium: item.images.standard_resolution.url
                };
            } else if (item.type === 'video') {
                data.media.video = {
                    low: item.videos.low_resolution.url
                    , medium: item.videos.standard_resolution.url
                };
            } else {
                console.log('Not implemented exception: Unknown media type: %s', item.type);
            }

            return data;
        }

        var result = {};
        result.author = parseAuthor(item);
        result.preview = parsePreview(item);
        result.data = parseData(item);

        var dateMoment = moment.unix(item.created_time);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();

        result.link = item.link;
        result.source = instagram.name;

        return result;
    };

    if (data.data) {
        for (var i = 0; i < data.data.length; i++) {
            result.push(parsePublication(data.data[i]));
        }
    } else {
        // When the request fails for example when tags, tagmode and format is not present.
    }

    next(undefined, result);
};
