/*jshint unused:vars */
'use strict';

/*

***************** IMPRESSUM *******************

University: University of Applied Sciences Salzburg

Major:      MultiMediaTechnology

Intent:     MultiMediaProjekt 2b

Authors:    David Neubauer (fhs35095),
            Joscha Probst (fhs34786)

Licence:    MIT License

*/

var manymes = window.manymes || {};

(function (){

    /**
     * Avatar Constructor
     * @param {object} data single avatar data from json
     */
    var Avatar = function Avatar(data){
        this.id = data.id;
        this.name = data.name;

        this.animation = new manymes.Animation(data.animation, data.spriteLength, data.id);
    };

    manymes.Avatar = Avatar;

})();