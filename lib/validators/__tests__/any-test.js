'use strict';

jest.autoMockOff();

var any = require('../any');

var pFalse = function() {
    throw new Error('Promise must be rejected');
};

describe('validators / any / notEmpty()', function() {

    pit('success with zero (string)', function() {
        var notEmpty = any.notEmpty();
        return notEmpty('0');
    });

    pit('success with zero', function() {
        var notEmpty = any.notEmpty();
        return notEmpty(0);
    });

    pit('success with string', function() {
        var notEmpty = any.notEmpty();
        return notEmpty('word');
    });

    pit('fail with empty string', function() {
        var notEmpty = any.notEmpty();
        return notEmpty('').then(pFalse, function(err) {
            expect(err.code).toBe('any.notEmpty');
        });
    });

    pit('fail with null', function() {
        var notEmpty = any.notEmpty();
        return notEmpty(null).then(pFalse, function(err) {
            expect(err.code).toBe('any.notEmpty');
        });
    });

    pit('fail with undefined', function() {
        var notEmpty = any.notEmpty();
        return notEmpty(undefined).then(pFalse, function(err) {
            expect(err.code).toBe('any.notEmpty');
        });
    });
});