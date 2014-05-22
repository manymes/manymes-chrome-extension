'use strict';

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
            var rand = null;

            // static limit of 5
            for(var i = 0; i < request.limit; i++){
                rand = Math.floor(Math.random() * urls.length);
                jsonUrls.push(urls.splice(rand, 1)[0].href);
            }
            console.log(jsonUrls);

            urls = 'dont use an array';
            sendResponse(JSON.stringify(jsonUrls));
        }
    }
);
