/*global manymes */
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

/**
 * appends manymes overlay to DOM of current tab
 */
function appendManyMesOverlay(){
    $('body').append('<div class="manymes-container">manymes is watching this tab</div></div><div id="manymes-avatar"></div>');
    var sack = $('<div>').attr('id', 'manymes-sack');
    sack.css('background-image', 'url(' + chrome.extension.getURL('images/icon/sack.png') + ')');
    $('body').append(sack);

    var avatar = new manymes.Avatar(manymes.avatars[2]);
    avatar.animation.start($('#manymes-avatar'));
}

/**
 * removes audio, video, embed and flash from DOM
 */
function muteAudioVideo(){
    $('audio, video, embed, object[type="application/x-shockwave-flash"]').remove();
}

/**
 * clears src attributes od img tags to save traffic costs
 * DOMNodeInserted is used to clear images loaded per AJAX as well
 */
function clearImgSrc(){
    $(document).bind('DOMNodeInserted', function(e) {
        var element = e.target;
        if(element.nodeName === 'IMG'){
            element.src = '';
        }
    });
}
/**
 * sets the favicon of the current Tab to the manymes favicon
 */
function setFavicon() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.extension.getURL('images/icon/favicon.png');
    document.getElementsByTagName('head')[0].appendChild(link);
}
/**
 * sends message to background.js to check if this tab is the one associated to the plugin
 * callback function is called if tab is associated to the plugin
 * @return {[type]} [description]
 */
chrome.runtime.sendMessage({method: 'getPluginTabId'}, function(){

    /**
     * if tab is inactive img-src´s are cleared and audio and video are muted
     */
    if(!document.hasFocus()){
        muteAudioVideo();
        clearImgSrc();
    }

    /**
     * when tab gets inactive it sends a message to background
     */
    $(window).unload(function() {
        chrome.runtime.sendMessage({method: 'tabClosed'});
    });


    $(document).ready(function(){
        appendManyMesOverlay();
        setFavicon();
        document.title = 'MANYMES';
    });
});
/**
 * get urls from href and from data-href
 * @return {array} urls
 */
function getUrls(){
    var jsonUrls = [],
    regex = '^(?:(?!(youtube|google|blogger)).)*$\r?\n?',//filter google, youtube and blogger links
    $urls = $('a'),
    hrefUrl = null,
    dataUrl = null,
    $url = null;
    $urls.each(function(){
        $url = $(this);
        hrefUrl = $url.attr('href');
        if(hrefUrl && hrefUrl.match(regex)){
            jsonUrls.push(hrefUrl);
        }
        if($url.data('href')){
            dataUrl = $url.data('href');
            console.log(dataUrl);
            if(dataUrl.match(regex)){
                jsonUrls.push($url.data('href'));
            }
        }
    });
    return jsonUrls;
}

/**
 * listenes to messages from background.js
 */
chrome.runtime.onMessage.addListener(
    function(request) {
        //gets the urls of the current tab, filter them and sends them to background.js
        if(request.method === 'getAvailableUrlsFromTab'){
            $(document).ready(function(){
                //DOMNodeInserted and setTimeout are used to get links loaded via AJAX
                $('#main').one('DOMNodeInserted', function() {
                    setTimeout(function(){
                        chrome.runtime.sendMessage({method: 'googleUrlsReady', pack: JSON.stringify(getUrls())});
                    }, 400);
                });
            });
        }
    }
);
