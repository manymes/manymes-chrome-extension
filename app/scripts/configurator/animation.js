/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Animation = function Animation(data){
        this.url = data.url;
        this.framesDurations = data.framesDurations;
        this.restartDelay = data.restartDelay;

        this.$renderContainer = null;
        this.currentFrame = null;

        this.EVENTS = {
            SET_URL: 'SET_URL'
        };
    };

    Animation.prototype.start = function($container){
        this.$renderContainer = $container;
        this.$renderContainer.css({
            'background-image': 'url(./images/avatars/bayern/sprites.png)',
            'background-size': 'auto ' + 300 * this.framesDurations.length + 'px',
            'background-repeat': 'no-repeat'
        });
        this.addTimer();
    };

    Animation.prototype.stop = function(){
        this.removeTimer();
    };

    Animation.prototype.addTimer = function(){
        var that = this;
        this.timer = function timer() {
            that.nextFrame();
            setTimeout(timer, that.framesDurations[0] * 1000);
        };

        this.timer();
    };

    Animation.prototype.nextFrame = function(){
        if(this.currentFrame === this.framesDurations.length - 1){
            this.currentFrame = 0;
            // timeout
        } else {
            this.currentFrame++;
        }
        this.$renderContainer.css('background-position-y', -300 * this.currentFrame - 45);
        console.log(-320 * this.currentFrame - 50);
    };

    manymes.Animation = Animation;

})();