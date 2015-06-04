/**
 * Created by Nahuel Barrios on 27/05/15.
 */
var CONSUMER_KEY = 'oy1KRFv0w7vnJgYV9MnzQ';
var CONSUMER_SECRET = 'p5DOWK5W8PfPSGEjufFR0MI2U2896aDM5mbiYFGLQ';
var ACCESS_TOKEN = '167430903-S92M9ardfhRFAM4pdAUrNA3TC1mlA91QtzyLgBET';
var ACCESS_TOKEN_SECRET = '9FUA6zwicRQjK2fjvHMaRHVKiBUzEm7vNU5dAa97cQ9st';

var moment = require('moment');
var networks = require('./../networks_service');
var Twit = require('twit')

var twit = new Twit({
    consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    , access_token: ACCESS_TOKEN
    , access_token_secret: ACCESS_TOKEN_SECRET
});

exports.findAll = function (query, next) {
    var queryStringParameters = {
        q: query
    };

    twit.get('search/tweets', queryStringParameters, function (error, response, body) {
        if (!error && body.statusCode == 200) {
            parseResponse(response, next);
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

            author.username = item.user.screen_name;
            author.name = item.user.name;
            author.id = item.user.id;

            author.profile = {};
            if (author.username) {
                author.profile.url = 'http://twitter.com/' + author.username;
            }
            author.profile.picture = item.user.profile_image_url;

            return author;
        }

        function parsePreview(item) {
            var preview = {};

            if (item.type === 'image') {
                preview.thumbnail = item.images.thumbnail;
            }

            preview.snippet = item.text;

            return preview;
        }

        function parseData(item) {
            var data = {};
            data.content = item.text;
            //data.media = {};

            return data;
        }

        var result = {};
        result.author = parseAuthor(item);
        result.preview = parsePreview(item);
        result.data = parseData(item);

        var dateMoment = moment(item.created_at);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();

        result.link = 'http://twitter.com/' + result.author.username + '/status/' + item.id_str;
        result.source = networks.getTwitterDisplayName();

        return result;
    };

    if (data.statuses) {
        for (var i = 0; i < data.statuses.length; i++) {
            result.push(parsePublication(data.statuses[i]));
        }
    }

    next(undefined, result);
};
