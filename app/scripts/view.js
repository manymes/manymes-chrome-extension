'use strict';

var manymes = window.manymes || {};

(function (){

    var View = function View(){
        this.EVENTS = {
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };

        $(this).on(this.EVENTS.STATE_CHANGED, this.onStateChanged);

    };

    View.prototype.onButtonStartStop = function(){
        $(this).trigger(this.EVENTS.CHANGE_STATE, {
            type: 'active',
            data: {

            }
        });
    };

    View.prototype.onStateChanged = function(event, data){
        console.log('received:', data);
    };

    manymes.View = View;


})();