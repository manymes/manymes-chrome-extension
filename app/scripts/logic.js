/*jshint unused:vars */
'use strict';

var manymes = window.manymes || {};

(function (){

    var Logic = function Logic(){
        this.location = null;
        this.active = false;
        this.availableUrls = [];
        this.currentUrl = null;
        this.baseUrl = null;

        this.EVENTS = {
            SET_URL: 'SET_URL',
            GET_AVAILABLE_URLS: 'GET_AVAILABLE_URLS',
            VISIT_URL_FROM_AVAILABLE: 'VISIT_URL_FROM_AVAILABLE',
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };

        var that = this;

        this.onGetAvailableUrlsComplete = function(urls){
            urls = JSON.parse(urls);
            for(var i = 0; i < urls.length; i++){
                that.availableUrls.push(urls[i]);
            }
            
            console.log(that);
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
        } else if (pack.type === 'viewInit'){
            $(this).trigger(this.EVENTS.STATE_CHANGED, {
                type: 'viewInit',
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

    Logic.prototype.onVisitUrlFromAvailableComplete = function(event){
        console.log('onVisitUrlFromAvailableComplete');
    };
    /*surfin bird*/
    Logic.prototype.setUrl = function(){
        this.baseUrl = this.generateBaseUrl();
        $(this).trigger(this.EVENTS.SET_URL, {
            callback: this.onSetUrlComplete,
            data: {
                url: this.baseUrl
            }
        });
    };

    Logic.prototype.getAvailableUrls = function(){
        $(this).trigger(this.EVENTS.GET_AVAILABLE_URLS, {
            callback: this.onGetAvailableUrlsComplete,
            data: {
                limit: 3
            }
        });
    };

    Logic.prototype.visitUrlFromAvailable = function(){
        var randomUrl = this.getRandomAvailableUrl();
        $(this).trigger(this.EVENTS.VISIT_URL_FROM_AVAILABLE, {
            callback: this.onVisitUrlFromAvailableComplete,
            data: {
                url: randomUrl
            }
        });
    };

    Logic.prototype.generateBaseUrl = function(){
        var words = ['salt', 'pepper', 'family guy'];
        var randomWord = words[Math.floor(Math.random() * words.length)];
        return 'http://www.google.com/#q=' + randomWord;
    };

    Logic.prototype.getRandomAvailableUrl = function(){

        var rand = Math.floor(Math.random() * this.availableUrls.length);
        var result = this.availableUrls.splice( rand, 1);
        return result[0];
            
    };

    Logic.prototype.areUrlsAvailable = function(){
        return this.availableUrls.length;
    };

    Logic.prototype.loop = function(){
        var that = this;
        setTimeout(function(){

            console.log('loop');
            console.log(that.availableUrls);
            if(that.baseUrl === null){
                console.log('set url');
                that.setUrl();
            }else if(!that.areUrlsAvailable()){
                console.log('get urls');
                that.getAvailableUrls();
            }else if(that.areUrlsAvailable()){
                console.log('visit urls');
                that.visitUrlFromAvailable();
            }else{
                console.log('set url2');
                that.setUrl();
            }



            if(that.active){
                that.loop();
            }
        }, 3000);

    };


    manymes.Logic = Logic;

})();