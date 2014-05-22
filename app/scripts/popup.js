'use strict';

var manymes = window.manymes || {};

var view = new manymes.View();

chrome.runtime.onMessage.addListener(function(request){
    if(request.method === 'stateChanged'){
        console.log('hallo');
        $(view).trigger(view.EVENTS.STATE_CHANGED, request.data);
    }
});

$(view).on(view.EVENTS.CHANGE_STATE, function(data){
    chrome.runtime.sendMessage({method: 'changeState', data: data});
});

 // var listener = function(request, sender, sendResponse){
        //     if(request.method === 'setFromAvailableComplete'){
        //         chrome.runtime.onMessage.removeListener(listener);

        //         $('#output').append("<p>From Available: " + request.data + "</p>");
        //         data.response(request.data);
        //     }
        // }

        // chrome.runtime.onMessage.addListener(listener);

console.log(view);
