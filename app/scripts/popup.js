'use strict';

$(document).ready(function(){
    var manymes = window.manymes || {};

    var view = new manymes.View($('body'));

    chrome.runtime.onMessage.addListener(function(request){
        if(request.method === 'stateChanged'){
            console.log('hallo');
            $(view).trigger(view.EVENTS.STATE_CHANGED, request.pack);
        }
    });

    $(view).on(view.EVENTS.CHANGE_STATE, function(event, pack){
        console.log(pack);
        chrome.runtime.sendMessage({method: 'changeState', pack: pack});
    });

     // var listener = function(request, sender, sendResponse){
            //     if(request.method === 'setFromAvailableComplete'){
            //         chrome.runtime.onMessage.removeListener(listener);

            //         $('#output').append("<p>From Available: " + request.data + "</p>");
            //         data.response(request.data);
            //     }
            // }

            // chrome.runtime.onMessage.addListener(listener);
});
