/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){
    /**
     * Configurator Model
     * @param {ConfiguratorView} view ConfiguratorView
     */
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

    /**
     * initialize
     */
    ConfiguratorModel.prototype.init = function(){
        for(var i = 0; i < manymes.avatars.length; i++){
            this.allAvatars.push(new manymes.Avatar(manymes.avatars[i]));
        }
        this.initActiveAvatarIndices();
    };

    /**
     * initialize active avatars, load from chrome.storage or set default
     */
    ConfiguratorModel.prototype.initActiveAvatarIndices = function(){

        var that = this;
        chrome.storage.local.get('activeAvatarIndices', function (result) {
            if($.isEmptyObject(result)){
                chrome.storage.local.set({'activeAvatarIndices': JSON.stringify([0,1,2])}, function () {
                    that.activeAvatarIndices = [0,1,2];
                });
            }else{
                that.activeAvatarIndices = JSON.parse(result.activeAvatarIndices);
            }
            for(var i = 0; i < 3; i++){
                that.allAvatars[that.activeAvatarIndices[i]].animation.start($('#avatar-' + i));
            }

            $(that).trigger(that.EVENTS.AVATAR_CHANGED, that.getPermalink());
        });
    };

    /**
     * change active avatar index
     * @param {int} slot number of slot to be rendered in
     */
    ConfiguratorModel.prototype.setActiveAvatarIndex = function(slot){
        this.allAvatars[this.activeAvatarIndices[slot]].animation.stop();
        this.activeAvatarIndices[slot] = this.getPrevAvatar(this.activeAvatarIndices[slot]);
        this.allAvatars[this.activeAvatarIndices[slot]].animation.start($('#avatar-' + slot));
        $(this).trigger(this.EVENTS.AVATAR_CHANGED, this.getPermalink());
        chrome.storage.local.set({'activeAvatarIndices': JSON.stringify(this.activeAvatarIndices)}, function () {
            console.log('set active avatar index');
        });
    };
    /**
     * builds permalink from active avatars
     * @return {string}
     */
    ConfiguratorModel.prototype.getPermalink = function(){
        var permalink = '';
        for(var i = 0; i < this.activeAvatarIndices.length; i++){
            permalink += this.allAvatars[this.activeAvatarIndices[i]].name + '-';
        }
        permalink = permalink.slice(0, -1);
        return permalink;
    };

    /**
     * get next avatar from available avatars, skip already used avatars
     * @param  {int} index
     * @return {int}
     */
    ConfiguratorModel.prototype.getNextAvatar = function(index){
        if(index >= this.allAvatars.length - 1){
            index = 0;
        }else{
            index += 1;
        }
        if(this.activeAvatarIndices.indexOf(index) > -1){
            return this.getNextAvatar(index);
        }else{
            return index;
        }
    };

    /**
     * get previous avatar from available avatars, skip already used avatars
     * @param  {int} index
     * @return {int}
     */
    ConfiguratorModel.prototype.getPrevAvatar = function(index){
        if(index <= 0){
            index = this.allAvatars.length - 1;
        }else{
            index -= 1;
        }
        if(this.activeAvatarIndices.indexOf(index) > -1){
            return this.getPrevAvatar(index);
        }else{
            return index;
        }
    };

    ConfiguratorModel.prototype.onPrevAvatar = function(event, slot, that){
        this.setActiveAvatarIndex(slot);
    };

    ConfiguratorModel.prototype.onNextAvatar = function(event, slot, that){
        this.setActiveAvatarIndex(slot);
        
    };

    manymes.ConfiguratorModel = ConfiguratorModel;

})();