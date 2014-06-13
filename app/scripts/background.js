/*jshint unused:vars */
'use strict';

var tabId = null;
var manymes = window.manymes || {};

var logic = new manymes.Logic();


/**
 * listens to messages from other plugin components
 * @param  {json} request      contains method and data
 * @param  {json} sender       sender of the message
 * @param  {callback} sendResponse callback function 
 * @return {}
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.method === 'changeState'){
        $(logic).trigger(logic.EVENTS.CHANGE_STATE, request.pack);
    }
    else if(request.method === 'getPluginTabId'){
        if(sender.tab.id === tabId){
            sendResponse(sender.tab);
        }
    }
    else if(request.method === 'googleUrlsReady'){
        $(logic).trigger(logic.EVENTS.GOOGLE_URLS_READY, request.pack);
    }
});


/**
 * handles changed state of logic
 * @param  {object} event event object
 * @param  {json} pack  contains changed logic data
 * @return {}
 */
$(logic).on(logic.EVENTS.STATE_CHANGED, function(event, pack){
    chrome.runtime.sendMessage({method: 'stateChanged', pack: pack});

    if(pack.type === 'active'){
        if(pack.data.state){ //open tab
            chrome.tabs.create({active: false, pinned: false, url: 'http://www.google.com'}, function(tab){
                tabId = tab.id;
            });
        } else { // close tab
            chrome.tabs.remove(tabId);
        }
    }
});


/**
 * sets URL in Tab given by the logic
 * @param  {object} event event object
 * @param  {json} pack  contains data and callback function
 * @return {}
 */
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


/**
 * gets urls from website browsed on
 * @param  {object} event event object
 * @param  {json} pack  contains data and callback function
 * @return {[type]}       [description]
 */
$(logic).on(logic.EVENTS.GET_AVAILABLE_URLS, function(event, pack){
    chrome.tabs.sendMessage(tabId, {method: 'getAvailableUrlsFromTab'}, function(urls){
            pack.callback(urls);
        });

});


/**
 * visits given url
 * @param  {object} event event object
 * @param  {json} pack  contains data and callback function
 * @return {}
 */
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

