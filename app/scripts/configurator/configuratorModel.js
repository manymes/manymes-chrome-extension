/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var ConfiguratorModel = function ConfiguratorModel(view){

        this.allAvatars = [];
        this.activeAvatarIndices = [];
        this.view = view;

        var that = this;
        $(this.view).on(that.view.EVENTS.PREV_AVATAR, that.onPrevAvatar);
        $(this.view).on(that.view.EVENTS.NEXT_AVATAR, that.onNextAvatar);


        this.EVENTS = {
            CATEGORY_CHANGED: 'CATEGORY_CHANGED'
        };

        this.init();
    };

    ConfiguratorModel.prototype.init = function(){
        for(var i = 0; i < manymes.avatars.length; i++){
            this.allAvatars.push(new manymes.Avatar(manymes.avatars[i]));
        }
    };


    ConfiguratorModel.prototype.getPermalink = function(){

    };

    ConfiguratorModel.prototype.onPrevAvatar = function(event, data){
        console.log('prev', data);
    };

    ConfiguratorModel.prototype.onNextAvatar = function(event, data){
        console.log('next', data);
    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();