/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Animation = function Animation(data, spriteLength, avatarId){
        this.avatarId = avatarId;
        this.spriteLength = spriteLength;
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
            'background-size': 'auto ' + 300 * this.spriteLength + 'px',
            'background-repeat': 'no-repeat'
        });
        this.addTimer();
    };

    Animation.prototype.stop = function(){
        clearTimeout(this.timer)
    };

    Animation.prototype.addTimer = function(){
        var that = this;

        function timer() {
            that.nextFrame();
            that.timer = setTimeout(timer, that.frames[that.currentFrame].duration);
        };

        timer();
    };

    Animation.prototype.nextFrame = function(){
        if(this.currentFrame === this.spriteLength - 1){
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        }

        var newOffset = - 300 * this.frames[this.currentFrame].frame;
        this.$renderContainer.css('background-position-y', newOffset - 45);
    };

    manymes.Animation = Animation;

})();