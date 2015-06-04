/**
 * Created by Nahuel Barrios on 27/05/15.
 */
var CLIENT_ID = 'cb1d643d638842518c90b63c6c3ea7a0';

//  TODO : Functionality : Replace each meta character (tested with & and it fails) for something specific (or not) for Instagram API.
var API_ENDPOINT_PREFFIX = 'https://api.instagram.com/v1/tags/';
var API_ENDPOINT_SUFIX = '/media/recent';

var request = require('request');
var querystring = require('querystring');
var moment = require('moment');

var networks = require('./../networks_service');

exports.findAll = function (onError, onSuccess, query) {
    var queryStringParameters = querystring.stringify({
        client_id: CLIENT_ID
        , callback: '?'
    });

    request({
        url: API_ENDPOINT_PREFFIX + query + API_ENDPOINT_SUFIX + '?' + queryStringParameters
        , json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseResponse(onError, onSuccess, body);
        }
    });
};

var parseResponse = function (onError, onSuccess, data) {
    data = JSON.parse(data.substring(1, data.length - 1));

    var response = {};
    response.data = [];

    var parsePublication = function (item) {
        function getUserNameFromAuthor(author) {
            return author.substring(author.indexOf('(') + 1, author.indexOf(')'));
        }

        var result = {};

        var author = {};

        author.username = getUserNameFromAuthor(item.author);
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

        var dateMoment = moment(item.published);
        result.date = dateMoment.toDate();
        result.dateDisplay = dateMoment.fromNow();
        result.link = item.link;

        result.source = networks.getFlickrDisplayName();

        return result;
    };

    if (data.data) {
        for (var i = 0; i < data.data.length; i++) {
            response.data.push(parsePublication(data.data[i]));
        }
    } else {
        // When the request fails for example when tags, tagmode and format is not present.
    }

    onSuccess(response);
};
