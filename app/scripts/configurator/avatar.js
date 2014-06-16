/*jshint unused:vars */
'use strict';

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