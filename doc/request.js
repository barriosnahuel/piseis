/**
 * Created by Nahuel Barrios <barrios.nahuel@gmail.com>.
 * Created on 11/5/13, at 12:49 AM.
 */

piseis.find({
                query: "something cool",
                excludeNetworks: {
                    facebook: true,
                    vimeo: true
                },
                callback: function (response) {
                    //  Do something here with everything we've found for you1
                }
            });

$.piseis(...);