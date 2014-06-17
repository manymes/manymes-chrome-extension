/*jshint unused:vars */
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

var manymes = window.manymes || {};

(function (){


    /**
     * Logic
     */
    var Logic = function Logic(){
        this.location = null;
        this.active = false;
        this.availableUrls = [];
        this.currentUrl = null;
        this.baseUrl = null;
        this.urlLimit = 1000;
        this.avatars = [];

        this.EVENTS = {
            SET_URL: 'SET_URL',
            GET_AVAILABLE_URLS: 'GET_AVAILABLE_URLS',
            VISIT_URL_FROM_AVAILABLE: 'VISIT_URL_FROM_AVAILABLE',
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED',
            GOOGLE_URLS_READY: 'GOOGLE_URLS_READY',
            TAB_CLOSED: 'TAB_CLOSED'
        };

        var that = this;


        /**
         * filters the urls fetched from the tab 
         * @param  {string} urls urls from tab
         * @return {}
         */
        this.onGetAvailableUrlsComplete = function(event, pack){
            var urls = JSON.parse(pack);
            var length = urls.length;
            var regex = '^(http|https)://.+?\\.(?!(jpg|png|gif|jpeg|pdf|zip))';
            for(var i = 0; i < length; i++){
                if(urls[i].match(regex)){
                    that.availableUrls.push(urls[i]);
                }
            }
            
        };

        $(this).on(this.EVENTS.CHANGE_STATE, this.onChangeState);
        $(this).on(this.EVENTS.GOOGLE_URLS_READY, this.onGetAvailableUrlsComplete);
        $(this).on(this.EVENTS.TAB_CLOSED, this.onTabClosed);
    };


    /**
     * handles messages from view
     * @param  {object} event event object
     * @param  {pack} pack  contains data and callback function
     * @return {}
     */
    Logic.prototype.onChangeState = function(event, pack){
        switch(pack.type){

            case 'active':
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
                break;

            case 'viewInit':
                $(this).trigger(this.EVENTS.STATE_CHANGED, {
                    type: 'viewInit',
                    data: {
                        state: this.active
                    }
                });
                break;

            case 'avatar':
                this.onAvatarChanged(pack, this);
                break;
     
            default:
            
                break;
        }
        
    };


    /*Callback functions*/

    /**
     * called when tab of plugin is closed to set active to false
     */
    Logic.prototype.onTabClosed = function(){
        this.active = false;
    };

    /**
     * [onAvatarChanged description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    Logic.prototype.onAvatarChanged = function(pack, that){
        that.avatars = pack.data.split('-');
        this.setBaseUrl();
    };

    /**
     * sends url to be set to tab
     */
    Logic.prototype.setBaseUrl = function(callback){
        this.baseUrl = this.generateBaseUrl();
        if(this.active){
            $(this).trigger(this.EVENTS.SET_URL, {
                callback: callback || this.onsetBaseUrlComplete,
                data: {
                    url: this.baseUrl
                }
            });
        }
       
    };


    /**
     * triggers GET_AVAILABLE_URLS
     * @return {}
     */
    Logic.prototype.getAvailableUrls = function(){
        $(this).trigger(this.EVENTS.GET_AVAILABLE_URLS, {
            callback: this.onGetAvailableUrlsComplete,
            data: {
                
            }
        });
    };


    /**
     * visit url from available
     * @return {}
     */
    Logic.prototype.visitUrlFromAvailable = function(){
        var randomUrl = this.getRandomAvailableUrl();
        $(this).trigger(this.EVENTS.VISIT_URL_FROM_AVAILABLE, {
            data: {
                url: randomUrl
            }
        });
    };


    /**
     * generates Base Url (Google at the moment)
     * @return {string} random url
     */
    Logic.prototype.generateBaseUrl = function(){
        var words = [];
        this.avatars.forEach(function(avatar) {
            words = words.concat(manymes.keywords[avatar] || []);
        });
        var randomWord = words[Math.floor(Math.random() * words.length)] || 'manymes';
        return 'http://www.google.com/#q=' + randomWord;
    };


    /**
     * returns random url from available urls
     * @return {string} random url
     */
    Logic.prototype.getRandomAvailableUrl = function(){

        var rand = Math.floor(Math.random() * this.availableUrls.length);
        var result = this.availableUrls.splice( rand, 1);
        return result[0];
            
    };


    /**
     * checks if urls are available
     * @return {boolean}
     */
    Logic.prototype.areUrlsAvailable = function(){
        return this.availableUrls.length;
    };

    
    /**
     * visits urls
     * @return {}
     */
    Logic.prototype.loop = function(){
        var that = this;
        setTimeout(function(){

            if(!that.areUrlsAvailable() && that.baseUrl !== null){
                that.setBaseUrl(function(){
                    that.getAvailableUrls();
                });
                
            }else if(that.areUrlsAvailable()){
                that.visitUrlFromAvailable();
            }else{
                that.setBaseUrl();
            }

            if(that.active){
                that.loop();
            }
        }, 10000);

    };


    manymes.Logic = Logic;

})();