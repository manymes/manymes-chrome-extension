'use strict';
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementsByTagName('img').removeAttribute('src');

// }, false);

function appendManyMesOverlay(){
    $('body').append('<div class="manymes-container">manymes is watching this tab</div>');
}

$(document).ready(function(){
    chrome.runtime.sendMessage({method: 'getPluginTabId'}, function(){
        appendManyMesOverlay();
    });
    
});

/**
 * fetches links from DOM
 * @return {array} urls
 */
function getLinks(){
    var links = document.getElementsByTagName('a'); // returns an HTML Collection
    links = Array.prototype.slice.call(links);
    return links;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method === 'getAvailableUrlsFromTab'){
            var urls = getLinks();
            var jsonUrls = [];

            for(var i = 0; i < urls.length; i++){
                jsonUrls.push(urls.splice(i, 1)[0].href);
            }

            sendResponse(JSON.stringify(jsonUrls));
        }
    }
);
