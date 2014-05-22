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

    View.prototype.onStateChanged = function(event, pack){
        this.$container.append('<p>' +  pack.type + ':'+ pack.data.state + '</p>');
    };

    manymes.View = View;


})();