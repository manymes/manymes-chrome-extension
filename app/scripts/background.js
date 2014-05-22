/*jshint unused:vars */
'use strict';

// chrome.runtime.onInstalled.addListener(function (details) {
//     console.log('previousVersion', details.previousVersion);
// });

// chrome.browserAction.setBadgeText({text: '\'Allo'});
// 
// 

var tabId = null;
chrome.tabs.create({}, function(tab){
    tabId = tab.id;
});


var manymes = window.manymes || {};

var logic = new manymes.Logic();

chrome.runtime.onMessage.addListener(function(request){
    if(request.method === 'changeState'){
        $(logic).trigger(logic.EVENTS.CHANGE_STATE, request.pack);
    }
});

$(logic).on(logic.EVENTS.STATE_CHANGED, function(event, pack){
    chrome.runtime.sendMessage({method: 'stateChanged', pack: pack});
});

$(logic).on(logic.EVENTS.SET_URL, function(event, pack){
    chrome.tabs.update(tabId, {url: pack.data.url }, function(tab){
            // add listener so callback executes only if page loaded. otherwise calls instantly
            var listener = function(tabId, changeInfo, tab) {
                if (changeInfo.status === 'complete') {
                    // remove listener, so only run once
                    chrome.tabs.onUpdated.removeListener(listener);
                    pack.callback();
                }
            };

            chrome.tabs.onUpdated.addListener(listener);
        });
});

$(logic).on(logic.EVENTS.GET_AVAILABLE_URLS, function(event, pack){
    chrome.tabs.sendMessage(tabId, {method: 'getAvailableUrlsFromTab', limit: pack.data.limit}, function(urls){
            pack.callback(urls);
        });

});

$(logic).on(logic.EVENTS.VISIT_URL_FROM_AVAILABLE, function(event, pack){
    chrome.tabs.update(tabId, {url: pack.data.url }, function(tab){
            // add listener so callback executes only if page loaded. otherwise calls instantly
            var listener = function(tabId, changeInfo, tab) {
                if (changeInfo.status === 'complete') {
                    // remove listener, so only run once
                    chrome.tabs.onUpdated.removeListener(listener);
                    pack.callback();
                }
            };

            chrome.tabs.onUpdated.addListener(listener);
        });
});

