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
            $(that).trigger(that.EVENTS.PREV_AVATAR, $(this).attr('slot'));
        });
        this.$container.find('.next-btn').on('click', function(){
            $(that).trigger(that.EVENTS.NEXT_AVATAR, $(this).attr('slot'));
        });
    };


    ConfiguratorView.prototype.createDOMElements = function(){
        var str = '';
        for(var i = 0; i < 3; i++){
            str += '<div id="avatar-'+ i +'" class="avatar">' +
                        '<button class="btn prev-btn" data-slot="'+ i +'"></button>' +
                        '<button class="btn next-btn" data-slot="'+ i +'"></button>' +
                    '</div>';
        }
        this.$container.append(str);


    };

    manymes.ConfiguratorView = ConfiguratorView;

})();