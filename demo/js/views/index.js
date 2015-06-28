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
 * Created on 11/6/13, at 12:07 AM.
 */
$(document).ready(function () {

    $.templates('eachResult', '#eachResultTemplate');

    var $list = $('#results');

    $('form').submit(function (event) {
        var onError = function () {
            var message = 'An error occurred while searching in social networks...';

            $list.append('<li>' + message + '</li>')
        };

        var onSuccess = function (data) {
            for (var i = 0; i < data.data.length; i++) {
                $list.append($.render.eachResult(data.data[i]));
            }
        };

        //  ========================================== STOP DECLARING FUNCTIONS
        event.preventDefault();

        $list.empty();

        var keyword = $('#keyword').val();
        $('body').piseis(onError, onSuccess, {
            query: keyword === '' ? undefined : keyword,
            excludedNetworks: []
        });
    });

});
