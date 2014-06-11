/* global describe, it, beforeEach, assert */

var manymes = window.manymes || {};


(function () {
    'use strict';

    describe('logic', function () {
        var logic = null;
        beforeEach(function(){
            logic = new manymes.Logic();
        });

        describe('getPermalink', function () {
            it('should return permalink', function () {
                assert.equal(true, true);
            });
        });
    });
})();
