/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

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


    ConfiguratorView.prototype.createDOMElements = function(){
        var str = '<div class="social"></div>';
        for(var i = 0; i < 3; i++){
            str += '<div id="avatar-' + i + '" class="avatar">' +
                        '<button class="btn prev-btn" data-slot="' + i + '"> prev </button>' +
                        '<button class="btn next-btn" data-slot="' + i + '"> next </button>' +
                    '</div>';
        }
        this.$container.append(str);


    };

    manymes.ConfiguratorView = ConfiguratorView;

})();