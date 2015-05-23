/**
 * Created by justkenchu on 22/05/15.
 */

var express = require('express');
var router = express.Router();

/* GET networks listing. */
router.get('/', function (req, res, next) {
    res.send([
        {
            id: 'flickr',
            name: 'Flickr',
            url: 'https://www.flickr.com/',
            logo_url: 'https://s.yimg.com/pw/images/goodies/white-small-circle.png'
        }
    ]);
});

module.exports = router;
