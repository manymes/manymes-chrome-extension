/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Animation = function Animation(data, avatarId){
        this.avatarId = avatarId;
        this.frames = data;

        this.$renderContainer = null;
        this.currentFrame = 0;

        this.EVENTS = {
            SET_URL: 'SET_URL'
        };
    };

    Animation.prototype.start = function($container){
        this.$renderContainer = $container;
        this.$renderContainer.css({
            'background-image': 'url(./images/avatars/' + this.avatarId + '/sprites.png)',
            'background-size': 'auto ' + 300 * this.frames.length + 'px',
            'background-repeat': 'no-repeat'
        });
        this.addTimer();
    };

    Animation.prototype.stop = function(){
        this.timer = null;
    };

    Animation.prototype.addTimer = function(){
        var that = this;
        this.timer = function timer() {
            that.nextFrame();
            setTimeout(timer, that.frames[that.currentFrame].duration);
        };

        this.timer();
    };

    Animation.prototype.nextFrame = function(){
        if(this.currentFrame === this.frames.length - 1){
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        }
        this.$renderContainer.css('background-position-y', -300 * this.currentFrame - 45);
    };

    manymes.Animation = Animation;

})();