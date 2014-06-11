/* global describe, it, beforeEach, assert */

var manymes = window.manymes || {};


(function () {
    'use strict';

    describe('configurator', function () {
        var model = null;
        var view = null;
        beforeEach(function(){
            view = new manymes.ConfiguratorView($());
            model = new manymes.ConfiguratorModel(view);
        });

        describe('getPermalink', function () {
            it('should return permalink', function () {
                assert.equal(typeof model.getPermalink(), 'string');
            });
        });
    });
})();
