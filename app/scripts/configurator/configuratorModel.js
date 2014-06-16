/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var ConfiguratorModel = function ConfiguratorModel(view){

        this.allAvatars = [];
        this.activeAvatarIndices = [];
        this.view = view;

        var that = this;
        $(this.view).on(that.view.EVENTS.PREV_AVATAR, function (event, slot){
            that.onPrevAvatar(event, slot, that);
        });
        $(this.view).on(that.view.EVENTS.NEXT_AVATAR, function (event, slot){
            that.onNextAvatar(event, slot, that);
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
        this.initActiveAvatarIndices();
    };

    ConfiguratorModel.prototype.initActiveAvatarIndices = function(){
        //DOTO - get them from localstorage
        //
        //MOCK function
        this.activeAvatarIndices = [0,1,2];
        this.allAvatars[this.activeAvatarIndices[0]].animation.start($('#avatar-0'));
        this.allAvatars[this.activeAvatarIndices[1]].animation.start($('#avatar-1'));
        this.allAvatars[this.activeAvatarIndices[2]].animation.start($('#avatar-2'));
    };


    ConfiguratorModel.prototype.writePermalinkToStorage = function(permalink){
        
    };

    ConfiguratorModel.prototype.getPermalinkFromStorage = function(permalink){
        
    };


    ConfiguratorModel.prototype.getPermalink = function(){
        var permalink = '';
        for(var i = 0; i < this.activeAvatarIndices.length; i++){
            permalink += this.allAvatars[this.activeAvatarIndices[i]].name + '-';
        }
        permalink = permalink.slice(0, -1);
        this.writePermalinkToStorage(permalink);
        return permalink;
    };

    ConfiguratorModel.prototype.getNextAvatar = function(index){
        if(index >= this.allAvatars.length - 1){
            index = 0;
        }else{
            index += 1;
        }
        if(this.activeAvatarIndices.indexOf(index) > -1){
            console.log('found');
            return this.getNextAvatar(index);
        }else{
            console.log('####', index);
            return index;
        }
    };

    ConfiguratorModel.prototype.getPrevAvatar = function(index){
        if(index <= 0){
            index = this.allAvatars.length - 1;
        }else{
            index -= 1;
        }
        if(this.activeAvatarIndices.indexOf(index) > -1){
            console.log('found');
            return this.getPrevAvatar(index);
        }else{
            console.log('####', index);
            return index;
        }
    };


    ConfiguratorModel.prototype.onPrevAvatar = function(event, slot, that){
        this.activeAvatarIndices[slot] = that.getPrevAvatar(this.activeAvatarIndices[slot]);

        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };

    ConfiguratorModel.prototype.onNextAvatar = function(event, slot, that){
        this.activeAvatarIndices[slot] = that.getNextAvatar(this.activeAvatarIndices[slot]);
        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();