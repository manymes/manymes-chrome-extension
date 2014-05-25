'use strict';

$(document).ready(function(){
    var manymes = window.manymes || {};

    var view = new manymes.View($('body'));

    chrome.runtime.onMessage.addListener(function(request){
        if(request.method === 'stateChanged'){
            $(view).trigger(view.EVENTS.STATE_CHANGED, request.pack);
        }
    });

    $(view).on(view.EVENTS.CHANGE_STATE, function(event, pack){
        chrome.runtime.sendMessage({method: 'changeState', pack: pack});
    });

    // attaching event handlers to the elements
    // triggers viewInit to get all the currentStates
    view.init();
});
