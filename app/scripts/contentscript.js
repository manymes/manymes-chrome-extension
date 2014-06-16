'use strict';


function appendManyMesOverlay(){
    $('body').append('<div class="manymes-container">manymes is watching this tab</div><div id="manymes-avatar">avatar</div>');

    var avatar = new manymes.Avatar(manymes.avatars[0]);
    // avatar.setRenderContainer();
    // avatar.animation.start();
    $('#manymes-avatar').css('background', 'green');
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

chrome.runtime.sendMessage({method: 'getPluginTabId'}, function(){


    if(document.hasFocus()){
        document.title = 'active';
    }else{
        document.title = 'inactive';
        muteAudioVideo();
        clearImgSrc();
    }

    $(document).ready(function(){
        appendManyMesOverlay();
        /********   development  ***********/
        muteAudioVideo();
        //$('img').removeAttr('src');
        /********   /development  ***********/
    });
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
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
