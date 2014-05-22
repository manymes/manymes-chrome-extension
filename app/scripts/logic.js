'use strict';

var manymes = window.manymes || {};

(function (){

    var Logic = function Logic(){
        this.location = null;
        this.active = 'hallo ich bin der state';
        this.availableUrls = [];

        this.EVENTS = {
            SET_URL: 'SET_URL',
            GET_AVAILABLE_URLS: 'GET_AVAILABLE_URLS',
            VISIT_URL_FROM_AVAILABLE: 'VISIT_URL_FROM_AVAILABLE',
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };

        $(this).on(this.EVENTS.CHANGE_STATE, this.onChangeState);
    };
    Logic.prototype.onChangeState = function(){
        $(this).trigger(this.EVENTS.STATE_CHANGED, {
            type: 'active',
            data: {
                state: this.active
            }
        });
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