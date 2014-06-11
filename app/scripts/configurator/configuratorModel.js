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
    };


    ConfiguratorModel.prototype.getPermalink = function(){

    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();