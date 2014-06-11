/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var ConfiguratorModel = function ConfiguratorModel(){

        this.allAvatars = [];
        this.activeAvatarIndices = [];


        this.EVENTS = {
            CATEGORY_CHANGED: 'CATEGORY_CHANGED'
        };

        for(var i = 0; i < manymes.avatars.length; i++){
            this.allAvatars.push(new manymes.Avatar(manymes.avatars[i]));
        }
        
    };


    ConfiguratorModel.prototype.getPermalink = function(){

    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();