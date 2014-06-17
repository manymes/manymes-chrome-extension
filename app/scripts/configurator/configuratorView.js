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
     * Handles the interaction of the user
     * @param {jquery-instance} $container
     */
    var ConfiguratorView = function ConfiguratorView($container){

        this.$container = $container;

        this.EVENTS = {
            NEXT_AVATAR: 'NEXT_AVATAR',
            PREV_AVATAR: 'PREV_AVATAR'
        };

        this.createDOMElements();

        var that = this;

        this.$container.find('.prev-btn').on('click', function(){
            $(that).trigger(that.EVENTS.PREV_AVATAR, $(this).data('slot'));
        });

        this.$container.find('.next-btn').on('click', function(){
            $(that).trigger(that.EVENTS.NEXT_AVATAR, $(this).data('slot'));
        });
    };


    /**
     * Creates the social-container and the avatar-containers with buttons
     */
    ConfiguratorView.prototype.createDOMElements = function(){
        var str = '<div id="configurator"><div class="social"></div>';
        for(var i = 0; i < 3; i++){
            str += '<div id="avatar-' + i + '" class="avatar">' +
                        '<button class="btn prev-btn" data-slot="' + i + '"> &lsaquo; </button>' +
                        '<button class="btn next-btn" data-slot="' + i + '"> &rsaquo; </button>' +
                    '</div>';
        }
        this.$container.append(str + '</div>');
    };

    manymes.ConfiguratorView = ConfiguratorView;

})();