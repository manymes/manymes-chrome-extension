'use strict';

var manymes = window.manymes || {};

(function (){


    /**
     * View
     * @param {$} $container jQuery Object
     */
    var View = function View($container){
        this.$container = $container;

        this.$configuratorContainer = this.$container.append('<div></div>');

        this.configuratorView = new manymes.ConfiguratorView(this.$configuratorContainer);
        this.configuratorModel = new manymes.ConfiguratorModel(this.configuratorView);

        var that = this;

        $(this.configuratorModel).on(that.configuratorModel.EVENTS.AVATAR_CHANGED, function (event, data){
            that.onAvatarChanged(event, data, that);
        });

        this.$button = $('#myonoffswitch');
        this.$label = $('.social');

        this.EVENTS = {
            CHANGE_STATE: 'CHANGE_STATE',
            STATE_CHANGED: 'STATE_CHANGED'
        };
    };
    /**
     * sets the label on the popup and triggers CHANGE_STATE
     * @param  {event} event
     * @param  {string} permalink
     * @param  {object} that
     */
    View.prototype.onAvatarChanged = function(event, permalink, that){

        that.$label.text(permalink);

        $(that).trigger(that.EVENTS.CHANGE_STATE, {
                type: 'avatar',
                data: permalink
            });
    };


    /**
     * initializes View
     * @return {}
     */
    View.prototype.init = function(){
        $(this).on(this.EVENTS.STATE_CHANGED, this.onStateChanged);

        var that = this;
        this.$button.on('click', function(){
            $(that).trigger(that.EVENTS.CHANGE_STATE, {
                type: 'active',
                data: { }
            });

            that.$button.toggleClass('active');
        });

        // get current values on reload/init
        $(this).trigger(this.EVENTS.CHANGE_STATE, {
                type: 'viewInit',
                data: { }
            });
    };

    
    /**
     * handles messages from logic
     * @param  {object} event event object
     * @param  {json} pack  pack contains data and callback function
     * @return {}
     */
    View.prototype.onStateChanged = function(event, pack){
        if(pack.type === 'active'){
            // nothing will happen
        } else if(pack.type === 'viewInit'){
            if(pack.data.state){ // onload state is false
                this.$button.toggleClass('active');
            }
        }
    };

    manymes.View = View;


})();