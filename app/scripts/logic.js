/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Logic = function Logic(){
        this.location = null;
        this.active = false;
        this.availableUrls = [];
        this.currentUrl = null;

        this.EVENTS = {
            SET_URL: 'SET_URL',
            GET_AVAILABLE_URLS: 'GET_AVAILABLE_URLS',
            VISIT_URL_FROM_AVAILABLE: 'VISIT_URL_FROM_AVAILABLE',
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };

        $(this).on(this.EVENTS.CHANGE_STATE, this.onChangeState);
    };

    Logic.prototype.onChangeState = function(event, pack){
        if(pack.type === 'active'){
            this.active = !this.active;
            if(this.active){
                this.loop();
            }else{
                this.currentUrl = null;
            }
            $(this).trigger(this.EVENTS.STATE_CHANGED, {
                type: 'active',
                data: {
                    state: this.active
                }
            });
        }
        
    };
    /*Callback functions*/
    Logic.prototype.onSetUrlComplete = function(event){
        console.log('onSetUrlComplete');

    };

    Logic.prototype.onGetAvailableUrlsComplete = function(event){
        console.log('onGetAvailableUrlsComplete');
    };

    Logic.prototype.onVisitUrlFromAvailableComplete = function(event){
        console.log('onVisitUrlFromAvailableComplete');
    };
    /*surfin bird*/
    Logic.prototype.setUrl = function(url){
        $(this).trigger(this.EVENTS.SET_URL, {
            callback: this.onSetUrlComplete,
            data: {
                url: url
            }
        });
    };

    Logic.prototype.getAvailableUrls = function(){
        $(this).trigger(this.EVENTS.GET_AVAILABLE_URLS, {
            callback: this.onGetAvailableUrlsComplete,
            data: {
                limit: 5
            }
        });
    };

    Logic.prototype.visitUrlFromAvailable = function(){
        $(this).trigger(this.EVENTS.VISIT_URL_FROM_AVAILABLE, {
            callback: this.onVisitUrlFromAvailableComplete,
            data: {
                url: 'http://www.google.de'
            }
        });
    };

    Logic.prototype.generateBaseUrl = function(){
        var words = ['salt', 'pepper', 'family guy'];
        var randomWord = words[Math.floor(Math.random() * words.length)];
        return 'http://www.google.com/#q=' + randomWord;
    };

    Logic.prototype.loop = function(){
        var that = this;
        setTimeout(function(){

            console.log('loop');

            if(that.currentUrl === null){
                that.setUrl(that.generateBaseUrl());
            }else{
                that.setUrl(that.generateBaseUrl());//get avail urls
            }



            if(that.active){
                that.loop();
            }
        }, 3000);

    };

//         var that = this;


        
//             onUrlVisited: function(data){
//                 if(data){
//                     console.log('gotcha', data);
//                     that.prototype.getAvailableUrls();
//                 } else {
//                     console.error('ERROR: onUrlVisited');
//                 }
//             },
//             onAvailableUrlsReceived: function(data){
//                 console.log('received urls');
//                 console.log(JSON.parse(data));
//                 that.availableUrls = JSON.parse(data);
//                 that.prototype.setUrlFromAvailable();
//             },
//             onUrlFromAvailableVisited: function(data){
//                 if(data){
//                     console.log('gotcha childiee');
//                     setTimeout(function() {
//                         that.prototype.setUrlFromAvailable();
//                     }, 3000);
//                 } else {
//                     console.error('ERROR: onUrlFromAvailableVisited');
//                 }
//             },
//             getAvailableUrls: function(){
//                 $(that).trigger(that.EVENTS.GET_AVAILABLE_URLS, {
//                     limit: 5,
//                     response: that.prototype.onAvailableUrlsReceived
//                 });
//             },
//             setUrlFromAvailable: function(){
//                 var rand = Math.floor(Math.random()*that.availableUrls.length);
//                 var url = that.availableUrls[rand];
//                 $(that).trigger(that.EVENTS.VISIT_URL_FROM_AVAILABLE, {
//                     url: url,
//                     response: that.prototype.onUrlFromAvailableVisited
//                 });
//             },
           



//     Logic.prototype.constructor = Logic;


    manymes.Logic = Logic;

})();