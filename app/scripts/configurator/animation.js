/*jshint unused:vars */
'use strict';

/*

***************** IMPRESSUM *******************

University: University of Applied Sciences Salzburg

Major:      MultiMediaTechnology

Intent:     MultiMediaProjekt 2b

Authors:    David Neubauer (fhs35095),
            Joscha Probst (fhs34786)

Licence:    MIT License

*/

var manymes = window.manymes || {};

(function (){

    /**
     * Constructor of Animation
     * @param {object} data         holds information about the frames
     * @param {number} spriteLength number of diffrent images
     * @param {string} avatarId     identifier of the avatar
     */
    var Animation = function Animation(data, spriteLength, avatarId){
        this.avatarId = avatarId;
        this.spriteLength = spriteLength;
        this.frames = data;
        this.frameHeight = 300;

        this.$renderContainer = null;
        this.currentFrame = 0;
    };

    /**
     * Sets the sprite as background-image and calls addTimer
     * @param  {jquery-instance} $container render conainter for the animation
     */
    Animation.prototype.start = function($container){
        this.$renderContainer = $container;
        var imgURL = chrome.extension.getURL('images/avatars/' + this.avatarId + '/sprites.png');
        this.$renderContainer.css({
            'background-image': 'url(' + imgURL + ')',
            'background-size': 'auto ' + 300 * this.spriteLength + 'px',
            'background-repeat': 'no-repeat'
        });
        this.addTimer();
    };

    /**
     * Clears the timeout of the animation
     */
    Animation.prototype.stop = function(){
        clearTimeout(this.timer);
    };

    /**
     * Starts the animation loop timer
     */
    Animation.prototype.addTimer = function(){
        var that = this;
        function timer() {
            that.nextFrame();
            that.timer = setTimeout(timer, that.frames[that.currentFrame].duration);
        }
        timer();
    };

    /**
     * Counting the current frame and sets the new background offset
     * @return {[type]} [description]
     */
    Animation.prototype.nextFrame = function(){
        if(this.isCurrentLastFrame()){
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        }

        // calculate the new offset, -45 for vertical alignment
        var newOffset = - this.frameHeight * this.frames[this.currentFrame].frame - 45;
        this.$renderContainer.css('background-position-y', newOffset);
    };

    /**
     * Compares the currentFrame value with the length of the frames array
     * @return {Boolean}
     */
    Animation.prototype.isCurrentLastFrame = function(){
        console.log(this.currentFrame === this.frames.length - 1);
        return this.currentFrame === this.frames.length - 1;
    };

    manymes.Animation = Animation;

})();