/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Animation = function Animation(){

        this.$renderContainer = null;

        this.EVENTS = {
            SET_URL: 'SET_URL'
        };
    };

    Animation.prototype.setRenderContainer = function($container){
        this.animation.setRenderContainer($container);
    };

    Animation.prototype.start = function(){

    };

    Animation.prototype.stop = function(){

    };

    manymes.Animation = Animation;

})();