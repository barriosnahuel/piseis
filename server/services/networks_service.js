/**
 * Created by Nahuel Barrios on 25/05/15.
 */

var RESOURCES_LOCATION = 'http://localhost:3000/public';

var flickr = {
    id: 'flickr'
    , name: 'Flickr'
    , url: 'https://www.flickr.com/'
    , logo_url: 'https://s.yimg.com/pw/images/goodies/white-small-circle.png'
};

var instagram = {
    id: 'instagram'
    , name: 'Instagram'
    , url: 'https://www.instagram.com/'
    , logo_url: RESOURCES_LOCATION + '/images' + '/network_logo_instagram.png'
};

var twitter = {
    id: 'twitter'
    , name: 'Twitter'
    , url: 'https://www.twitter.com/'
    , logo_url: 'https://g.twimg.com/Twitter_logo_blue.png'
};

exports.findAll = function () {
    return [
        flickr
        , instagram
        , twitter
    ]
};
exports.getFlickr = function () {
    return flickr;
};
exports.getInstagram = function () {
    return instagram;
};
exports.getTwitter = function () {
    return twitter;
};
