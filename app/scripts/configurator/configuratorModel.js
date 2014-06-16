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

        var that = this;
        chrome.storage.local.get('activeAvatarIndices', function (result) {
            if($.isEmptyObject(result)){
                console.log('empty');
                chrome.storage.local.set({'activeAvatarIndices': JSON.stringify([0,1,2])}, function () {
                    console.log('set');
                    that.activeAvatarIndices = [0,1,2];
                });
            }else{
                console.log('from local storage');
                that.activeAvatarIndices = JSON.parse(result.activeAvatarIndices);
            }
            

            that.allAvatars[that.activeAvatarIndices[0]].animation.start($('#avatar-0'));
            that.allAvatars[that.activeAvatarIndices[1]].animation.start($('#avatar-1'));
            that.allAvatars[that.activeAvatarIndices[2]].animation.start($('#avatar-2'));
        });
    };

    ConfiguratorModel.prototype.setActiveAvatarIndex = function(slot){
        this.activeAvatarIndices[slot] = this.getPrevAvatar(this.activeAvatarIndices[slot]);
        chrome.storage.local.set({'activeAvatarIndices': JSON.stringify(this.activeAvatarIndices)}, function () {
            console.log('set active avatar index');
        });
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
        this.allAvatars[this.activeAvatarIndices[slot]].animation.stop();
        this.setActiveAvatarIndex(slot);
        this.allAvatars[this.activeAvatarIndices[slot]].animation.start($('#avatar-' + slot));
        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };

    ConfiguratorModel.prototype.onNextAvatar = function(event, slot, that){
        this.allAvatars[this.activeAvatarIndices[slot]].animation.stop();
        this.setActiveAvatarIndex(slot);
        this.allAvatars[this.activeAvatarIndices[slot]].animation.start($('#avatar-' + slot));

        $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
    };



    manymes.ConfiguratorModel = ConfiguratorModel;

})();