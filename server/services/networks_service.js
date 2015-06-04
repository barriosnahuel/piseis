/**
 * Created by Nahuel Barrios on 25/05/15.
 */

exports.findAll = function () {
    return [
        {
            id: 'flickr',
            name: 'Flickr',
            url: 'https://www.flickr.com/',
            logo_url: 'https://s.yimg.com/pw/images/goodies/white-small-circle.png'
        }
    ]
};

exports.getFlickrDisplayName = function () {
    return 'Flickr';
};

exports.getInstagramDisplayName = function () {
    return 'Instagram';
};
