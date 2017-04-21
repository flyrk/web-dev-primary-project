/*
 * spa.fake.js
 * Fake Module
*/
/*jslint                browser : true,  continue : true,
  devel     : true, indent    : 2,      maxerr     : 50,
  newcap : true, nomen   : true, plusplus    : true,
  regexp  : true, sloppy    : true, vars          : false,
  white    : true
*/
/*global $, spa */
spa.fake = (function() {
    'use strict';
    var getPeopleList;
    getPeopleList = function () {
        return [
            {  name : 'Eric', _id : 'id_01',
                css_map : { top: 20, left: 20, 'background-color' : '#1573a8' }
            },
            {  name : 'Simon', _id : 'id_02',
                css_map : { top: 60, left: 20, 'background-color' : '#e3db12' }
            },
            {  name : 'Yuki', _id : 'id_03',
                css_map : { top: 100, left: 20, 'background-color' : '#db1e95' }
            },
            {  name : 'Karen', _id : 'id_04',
                css_map : { top: 140, left: 20, 'background-color' : '#ec230f' }
            }
        ];
    };
    return {
        getPeopleList: getPeopleList
    };
})();
