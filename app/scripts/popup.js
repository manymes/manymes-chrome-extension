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

$(document).ready(function(){
    var manymes = window.manymes || {};

    manymes.view = new manymes.View($('#container'));

    chrome.runtime.onMessage.addListener(function(request){
        if(request.method === 'stateChanged'){
            $(manymes.view).trigger(manymes.view.EVENTS.STATE_CHANGED, request.pack);
        }
    });

    $(manymes.view).on(manymes.view.EVENTS.CHANGE_STATE, function(event, pack){
        chrome.runtime.sendMessage({method: 'changeState', pack: pack});
    });

    // attaching event handlers to the elements
    // triggers viewInit to get all the currentStates
    manymes.view.init();
});
