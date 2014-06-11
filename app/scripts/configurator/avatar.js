/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Avatar = function Avatar(){
        this.id = null;
        this.name = '';
        this.animation = new manymes.Animation();
        this.renderContainer = null;

        this.EVENTS = {
            SET_URL: 'SET_URL'
        };
    };

    Avatar.prototype.setRenderContainer = function(){

    };

    manymes.Avatar = Avatar;

})();