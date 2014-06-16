/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Avatar = function Avatar(data){
        this.id = data.id;
        this.name = data.name;

        // add loop to support multiple animations
        var singleAnimation = data.animations[0];
        this.animation = new manymes.Animation(singleAnimation);

        this.EVENTS = {
            SET_URL: 'SET_URL'
        };
    };

    Avatar.prototype.setRenderContainer = function($container){
        this.animation.setRenderContainer($container);
    };

    manymes.Avatar = Avatar;

})();