/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var ConfiguratorModel = function ConfiguratorModel(view){

        this.allAvatars = [];
        this.activeAvatarIndices = [];
        this.view = view;

        var that = this;
        $(this.view).on(that.view.EVENTS.PREV_AVATAR, function (event, data){
            that.onPrevAvatar(event, data, that);
        });
        $(this.view).on(that.view.EVENTS.NEXT_AVATAR, function (event, data){
            that.onNextAvatar(event, data, that);
        });


        this.EVENTS = {
            AVATAR_CHANGED: 'AVATAR_CHANGED'
        };

        this.init();
    };

    ConfiguratorModel.prototype.init = function(){
        for(var i = 0; i < manymes.avatars.length; i++){
            this.allAvatars.push(new manymes.Avatar(manymes.avatars[i]));
        }
        this.initActiveAvatars();
    };

    ConfiguratorModel.prototype.initActiveAvatarIndices = function(){
        //DOTO - get them from localstorage
        //
        //MOCK function
        this.activeAvatarIndices = [0,1,2];
    };


    ConfiguratorModel.prototype.getPermalink = function(){
        return 'computer-feuerwehr-bayern';
    };

    ConfiguratorModel.prototype.onPrevAvatar = function(event, data, that){
        console.log('prev', data, that);
        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };

    ConfiguratorModel.prototype.onNextAvatar = function(event, data, that){
        console.log('next', data, that);
        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();