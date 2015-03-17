'use strict';

jest.autoMockOff();

var any = require('../any');

var pFalse = function() {
    throw new Error('Promise must be rejected');
};

describe('validators / any / notBlank()', function() {

    pit('success with zero (string)', function() {
        var notBlank = any.notBlank();
        return notBlank('0');
    });

    pit('success with zero', function() {
        var notBlank = any.notBlank();
        return notBlank(0);
    });

    pit('success with string', function() {
        var notBlank = any.notBlank();
        return notBlank('word');
    });

    pit('fail with empty string', function() {
        var notBlank = any.notBlank();
        return notBlank('').then(pFalse, function(err) {
            expect(err.code).toBe('any.notBlank');
        });
    });

    pit('fail with null', function() {
        var notBlank = any.notBlank();
        return notBlank(null).then(pFalse, function(err) {
            expect(err.code).toBe('any.notBlank');
        });
    });

    pit('fail with undefined', function() {
        var notBlank = any.notBlank();
        return notBlank(undefined).then(pFalse, function(err) {
            expect(err.code).toBe('any.notBlank');
        });
    });
});