/* global describe, it, beforeEach, assert */

var manymes = window.manymes || {};


(function () {
    'use strict';

    describe('logic', function () {
        var logic = null;
        beforeEach(function(){
            logic = new manymes.Logic();
        });

        describe('stateChange', function () {
            it('should return the right state', function () {
                assert.equal(logic.testFunc(), 123);
            });
        });
    });
})();
