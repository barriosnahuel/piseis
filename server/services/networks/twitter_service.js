/**
 * Created by Nahuel Barrios on 27/05/15.
 */
var defaultConfig = require('./../../development.json');
var CONSUMER_KEY = process.env.NETWORK_TWITTER_CONSUMER_KEY || defaultConfig.networks.twitter.consumer_key;
var CONSUMER_SECRET = process.env.NETWORK_TWITTER_CONSUMER_SECRET || defaultConfig.networks.twitter.consumer_secret;
var ACCESS_TOKEN = process.env.NETWORK_TWITTER_ACCESS_TOKEN || defaultConfig.networks.twitter.access_token;
var ACCESS_TOKEN_SECRET = process.env.NETWORK_TWITTER_ACCESS_TOKEN_SECRET || defaultConfig.networks.twitter.access_token_secret;

var moment = require('moment');
var Twit = require('twit');

var twit = new Twit({
    consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    , access_token: ACCESS_TOKEN
    , access_token_secret: ACCESS_TOKEN_SECRET
});

var twitter = {
    id: 'twitter'
    , name: 'Twitter'
    , url: 'https://www.twitter.com/'
    , logo_url: 'https://g.twimg.com/Twitter_logo_blue.png'
};

exports.getTwitter = function () {
    return twitter;
};

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
                author.profile.url = twitter.url + author.username;
                author.profile.description = item.user.description;
            }
            author.profile.picture = item.user.profile_image_url;

            author.stats = {};
            author.stats.publications = item.user.statuses_count;
            author.stats.followers = item.user.followers_count;
            author.stats.friends = item.user.friends_count;

            author.verified = item.user.verified;

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

            data.media = {};
            if (item.entities && item.entities.media && item.entities.media.length > 0) {
                if ('photo' === item.entities.media[0].type) {
                    data.media.image = {
                        medium: item.entities.media[0].media_url
                    };
                } else {
                    // Twitter API only supports photo for now: https://dev.twitter.com/overview/api/entities-in-twitter-objects#media
                }
            }

            return data;
        }

        var result = {};
        result.author = parseAuthor(item);
        result.preview = parsePreview(item);
        result.data = parseData(item);

        var dateMoment = moment(item.created_at);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();

        result.link = twitter.url + result.author.username + '/status/' + item.id_str;
        result.source = twitter.name;

        return result;
    };

    if (data.statuses) {
        for (var i = 0; i < data.statuses.length; i++) {
            result.push(parsePublication(data.statuses[i]));
        }
    }

    next(undefined, result);
};
