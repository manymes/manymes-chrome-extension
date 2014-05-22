'use strict';

var manymes = window.manymes || {};

(function (){

    var View = function View($container){
        this.$container = $container;
        this.$button = $('<button>LOs</button>').appendTo(this.$container);
        this.EVENTS = {
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };

        $(this).on(this.EVENTS.STATE_CHANGED, this.onStateChanged);
        var that = this;
        this.$button.on('click', function(){
            console.log(that.EVENTS.CHANGE_STATE);
            $(that).trigger(that.EVENTS.CHANGE_STATE, {
                type: 'active',
                data: {

                }
            });
        });

    };

    View.prototype.onStateChanged = function(event, data){
        this.$container.append('<p>received:' +  data.type + '</p>');
    };

    manymes.View = View;


})();