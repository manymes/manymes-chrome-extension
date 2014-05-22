'use strict';

// chrome.runtime.onInstalled.addListener(function (details) {
//     console.log('previousVersion', details.previousVersion);
// });

// chrome.browserAction.setBadgeText({text: '\'Allo'});
// 
var manymes = window.manymes || {};

var logic = new manymes.Logic();

chrome.runtime.onMessage.addListener(function(request){
    if(request.method === 'changeState'){
        $(logic).trigger(logic.EVENTS.CHANGE_STATE, request.data);
    }
});

$(logic).on(logic.EVENTS.STATE_CHANGED, function(data){
    chrome.runtime.sendMessage({method: 'stateChanged', data: data});
});

