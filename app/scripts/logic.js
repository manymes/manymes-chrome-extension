/*jshint unused:vars */
'use strict';

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
            STATE_CHANGED: 'STATE_CHANGED'
        };

        var that = this;


        /**
         * filters the urls fetched from the tab 
         * @param  {string} urls urls from tab
         * @return {}
         */
        this.onGetAvailableUrlsComplete = function(urls){
            urls = JSON.parse(urls);
            var length = urls.length;
            //google regex
            var regex = '^(http|https)://(?!(www|maps|plus|mail|translate|accounts|play|webcache|support|news|drive|books)\\.google).+?\\.(?!(jpg|png|gif|jpeg|pdf|zip))';
            for(var i = 0; i < length; i++){
                if(urls[i].match(regex)){
                    that.availableUrls.push(urls[i]);
                }
            }
            
        };

        $(this).on(this.EVENTS.CHANGE_STATE, this.onChangeState);
    };


    /**
     * handles messages from view
     * @param  {object} event event object
     * @param  {pack} pack  contains data and callback function
     * @return {}
     */
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
        } else if (pack.type === 'avatar'){
            this.onAvatarChanged(pack, this);
        }
        
    };


    /*Callback functions*/


    /**
     * [onSetUrlComplete description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    Logic.prototype.onSetUrlComplete = function(event){

    };

    /**
     * [onAvatarChanged description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    Logic.prototype.onAvatarChanged = function(pack, that){
        that.avatars = pack.data.split('-');
        this.setUrl();
    };


    /**
     * [onVisitUrlFromAvailableComplete description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    Logic.prototype.onVisitUrlFromAvailableComplete = function(event){

    };


    /**
     * sends url to be set to tab
     */
    Logic.prototype.setUrl = function(){
        this.baseUrl = this.generateBaseUrl();
        $(this).trigger(this.EVENTS.SET_URL, {
            callback: this.onSetUrlComplete,
            data: {
                url: this.baseUrl
            }
        });
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
            callback: this.onVisitUrlFromAvailableComplete,
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
        console.log(words);
        var randomWord = words[Math.floor(Math.random() * words.length)];
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
                that.getAvailableUrls();
            }else if(that.areUrlsAvailable()){
                that.visitUrlFromAvailable();
            }else{
                that.setUrl();
            }

            if(that.active){
                that.loop();
            }
        }, 3000);

    };


    manymes.Logic = Logic;

})();