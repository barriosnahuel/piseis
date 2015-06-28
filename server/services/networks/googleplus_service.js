/**
 * Created by Nahuel Barrios on 05/06/15.
 */
var defaultConfig = require('./../../development.json');
var API_KEY = process.env.NETWORK_GOOGLE_PLUS_API_KEY || defaultConfig.networks.googleplus.api_key;

var API_ENDPOINT = ' https://www.googleapis.com/plus/v1';

var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

var gplus = {
    id: 'googleplus'
    , name: 'Google+'
    , url: 'https://plus.google.com/'
    , logo_url: 'https://developers.google.com/+/images/branding/sign-in-buttons/Red-signin_Short_base_44dp.png'
};

exports.getGooglePlus = function () {
    return gplus;
};

exports.findAll = function (query, next) {
    var queryStringParameters = querystring.stringify({
        query: query
        , key: API_KEY
        , maxResults: 20
        , orderBy: 'recent'
    });

    request({
        url: API_ENDPOINT + '/activities?' + queryStringParameters
        , json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseResponse(body, next);
        } else {
            next({statusCode: body.error.code, message: body.error.message});
        }
    });
};

var parseResponse = function (data, next) {
    var result = [];

    var parsePublication = function (item) {

        function parseAuthor(item) {
            var author = {};

            author.username = item.actor.displayName;

            if (item.actor.name) {
                author.name = item.actor.name.givenName + ' ' + item.actor.name.familyName;
            } else {
                author.name = author.username;
            }

            author.id = item.actor.id;

            author.profile = {};
            author.profile.url = item.actor.url;
            author.profile.picture = item.actor.image.url;

            return author;
        }

        function parsePreview(item) {
            var preview = {};

            if (item.object.attachments) {

                var media = item.object.attachments[0];
                var type = media.objectType;
                if (media.image && (type === 'photo' || type === 'video' || type === 'article')) {
                    preview.thumbnail = media.image.url;
                }
            }
            preview.snippet = item.title;

            return preview;
        }

        function parseData(item) {
            var data = {};
            data.content = item.object.content || item.object.title;

            data.media = {};
            if (item.object.attachments) {
                var type = item.object.attachments[0].objectType;
                if (type === 'photo') {
                    data.media.image = {
                        medium: item.object.attachments[0].fullImage.url
                    };
                } else if (type === 'video') {
                    data.media.video = {
                        medium: item.object.attachments[0].url
                    };
                } else if (type === 'article') {
                    data.media.article = {
                        url: item.object.attachments[0].url
                    }
                } else if (type === 'event') {
                    data.media.article = {
                        url: item.object.attachments[0].url
                    }
                } else {
                    console.log('Not implemented exception: Unknown media type: %s', type);
                }
            }

            return data;
        }

        var result = {};
        result.author = parseAuthor(item);
        result.preview = parsePreview(item);
        result.data = parseData(item);

        var dateMoment = moment(item.published);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();

        result.link = item.object.url;
        result.source = gplus.name;

        return result;
    };

    if (data.items) {
        for (var i = 0; i < data.items.length; i++) {
            result.push(parsePublication(data.items[i]));
        }
    }

    next(undefined, result);
};
