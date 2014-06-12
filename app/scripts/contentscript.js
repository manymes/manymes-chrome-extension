'use strict';


function appendManyMesOverlay(){
    $('body').append('<div class="manymes-container">manymes is watching this tab</div>');
}

chrome.runtime.sendMessage({method: 'getPluginTabId'}, function(){

    if(document.hasFocus()){
        document.title = 'active';
    }else{
        document.title = 'inactive';
    }

    $(document).ready(function(){
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

            var regex = '^(?:(?!(youtube|blogger\\.com)).)*$\r?\n?';
            var url = null;
            for(var i = 0; i < urls.length; i++){
                url = urls.splice(i, 1)[0].href;
                if(url.match(regex)){
                    jsonUrls.push(url);
                }
                
            }

            sendResponse(JSON.stringify(jsonUrls));
        }
    }
);
