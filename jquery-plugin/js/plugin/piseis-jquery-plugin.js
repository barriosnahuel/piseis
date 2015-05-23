/*
 * PiSeis - What people around the world is saying, you've got it.
 *  Copyright (C) 2013 Nahuel Barrios <barrios.nahuel@gmail.com>.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by Nahuel Barrios <barrios.nahuel@gmail.com>.
 * Created on 11/5/13, at 11:24 PM.
 */

(function ($) {

    $.fn.piseis = function (onError, onSuccess, options) {

        //  This is the easiest way to have default options.
        var settings = $.extend({
                                    //  These are the defaults.
                                    query: 'NBA',
                                    excludeNetworks: ['Facebook']
                                }, options);

        org.nbempire.js.piseis.find(onError, onSuccess, settings);

        return this;
    };

}(jQuery));
