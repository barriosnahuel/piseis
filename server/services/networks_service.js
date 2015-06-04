/**
 * Created by Nahuel Barrios on 25/05/15.
 */

var RESOURCES_LOCATION = 'http://localhost:3000/public';

exports.findAll = function () {
    return [
        {
            id: 'flickr'
            , name: 'Flickr'
            , url: 'https://www.flickr.com/'
            , logo_url: 'https://s.yimg.com/pw/images/goodies/white-small-circle.png'
        }, {
            id: 'instagram'
            , name: 'Instagram'
            , url: 'https://www.instagram.com/'
            , logo_url: RESOURCES_LOCATION + '/images' + '/network_logo_instagram.png'
        }
    ]
};

exports.getFlickrDisplayName = function () {
    return 'Flickr';
};

exports.getInstagramDisplayName = function () {
    return 'Instagram';
};
