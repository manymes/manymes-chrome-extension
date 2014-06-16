/*global manymes */

'use strict';


function appendManyMesOverlay(){
    $('body').append('<div class="manymes-container">manymes is watching this tab</div><div id="manymes-avatar">avatar</div>');

    var avatar = new manymes.Avatar(manymes.avatars[0]);
    avatar.animation.start($('#manymes-avatar'));

    //$('#manymes-avatar').css('background', 'green');
}

function muteAudioVideo(){
    $('audio, video, embed, object[type="application/x-shockwave-flash"]').remove();
}

function clearImgSrc(){
    $(document).bind('DOMNodeInserted', function(e) {
        var element = e.target;
        if(element.nodeName === 'IMG'){
            element.src = '';
        }
    });
}

function setFavicon() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.extension.getURL('images/icon/favicon.png');
    document.getElementsByTagName('head')[0].appendChild(link);
}

chrome.runtime.sendMessage({method: 'getPluginTabId'}, function(){


    if(!document.hasFocus()){
        muteAudioVideo();
        clearImgSrc();
    }

    $(window).unload(function() {
        chrome.runtime.sendMessage({method: 'tabClosed'});
    });

    $(document).ready(function(){
        appendManyMesOverlay();
        setFavicon();
        document.title = 'MANYMES';
    });
});


chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.method === 'getAvailableUrlsFromTab'){
            
            $(document).ready(function(){
                $('#main').one('DOMNodeInserted', function() {
                    setTimeout(function(){
                        var jsonUrls = [];
                        var regex = '^(?:(?!(youtube|google|blogger)).)*$\r?\n?';
                        var $urls = $('a');
                        var hrefUrl = null;
                        var dataUrl = null;
                        var $url = null;
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
                        console.log('send response');
                        chrome.runtime.sendMessage({method: 'googleUrlsReady', pack: JSON.stringify(jsonUrls)});
                    }, 400);
                    
                });

            });
            
            
        }
    }
);
