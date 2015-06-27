/**
 * Created by Nahuel Barrios on 25/05/15.
 */

exports.findAll = function () {
    return [
        require('./networks/flickr_service').getFlickr()
        , require('./networks/instagram_service').getInstagram()
        , require('./networks/twitter_service').getTwitter()
        , require('./networks/googleplus_service').getGooglePlus()
    ]
};
