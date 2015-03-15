'use strict';

jest.autoMockOff();

var number = require('../number');

var pFalse = function() {
    throw new Error('Promise must be rejected');
};

describe('validators / number / is()', function() {

    pit('success with number (string)', function() {
        var is = number.is();
        return is('1234');
    });

    pit('success with number', function() {
        var is = number.is();
        return is(1234);
    });

    pit('success with empty', function() {
        var is = number.is();
        return is('');
    });

    pit('success with null', function() {
        var is = number.is();
        return is(null);
    });

    pit('success with undefined', function() {
        var is = number.is();
        return is(undefined);
    });

    pit('fail with char', function() {
        var is = number.is();
        return is('a').then(pFalse, function(err) {
            expect(err.code).toBe('number.is');
        });
    });

    pit('fail with mixed numbers and char', function() {
        var is = number.is();
        return is('12a').then(pFalse, function(err) {
            expect(err.code).toBe('number.is');
        });
    });

    pit('fail with spaces', function() {
        var is = number.is();
        return is('12 34').then(pFalse, function(err) {
            expect(err.code).toBe('number.is');
        });
    });
});

describe('validators / number / max(limit)', function() {

    pit('success with number (string)', function() {
        var max = number.max(15);
        return max('14');
    });

    pit('success with number', function() {
        var max = number.max(15);
        return max(14);
    });

    pit('success with empty', function() {
        var max = number.max(15);
        return max('');
    });

    pit('success with null', function() {
        var max = number.max(15);
        return max(null);
    });

    pit('success with undefined', function() {
        var max = number.max(15);
        return max(undefined);
    });

    it('fail when the limit is not a number', function() {
        expect(function() {
            number.max('char');
        }).toThrow(new Error('limit must be a number'));
    });

    pit('fail with number too high (string)', function() {
        var max = number.max(15);
        return max('16').then(pFalse, function(err) {
            expect(err.code).toBe('number.max');
        });
    });

    pit('fail with number too high', function() {
        var max = number.max(15);
        return max(16).then(pFalse, function(err) {
            expect(err.code).toBe('number.max');
        });
    });
});

describe('validators / number / min(limit)', function() {

    pit('success with number (string)', function() {
        var min = number.min(15);
        return min('16');
    });

    pit('success with number', function() {
        var min = number.min(15);
        return min(16);
    });

    pit('success with empty', function() {
        var min = number.min(15);
        return min('');
    });

    pit('success with null', function() {
        var min = number.min(15);
        return min(null);
    });

    pit('success with undefined', function() {
        var min = number.min(15);
        return min(undefined);
    });

    it('fail when the limit is not a number', function() {
        expect(function() {
            number.min('char');
        }).toThrow(new Error('limit must be a number'));
    });

    pit('fail with number too low (string)', function() {
        var min = number.min(15);
        return min('14').then(pFalse, function(err) {
            expect(err.code).toBe('number.min');
        });
    });

    pit('fail with number too low', function() {
        var min = number.min(15);
        return min(14).then(pFalse, function(err) {
            expect(err.code).toBe('number.min');
        });
    });
});

describe('validators / number / equals(seed)', function() {

    pit('success with number (string)', function() {
        var equals = number.equals(15);
        return equals('15');
    });

    pit('success with number', function() {
        var equals = number.equals(15);
        return equals(15);
    });

    pit('success with empty', function() {
        var equals = number.equals(15);
        return equals('');
    });

    pit('success with null', function() {
        var equals = number.equals(15);
        return equals(null);
    });

    pit('success with undefined', function() {
        var equals = number.equals(15);
        return equals(undefined);
    });

    it('fail when the seed is not a number', function() {
        expect(function() {
            number.equals('char');
        }).toThrow(new Error('seed must be a number'));
    });

    pit('fail with number not equals (string)', function() {
        var equals = number.equals(15);
        return equals('14').then(pFalse, function(err) {
            expect(err.code).toBe('number.equals');
        });
    });

    pit('fail with number not equals', function() {
        var equals = number.equals(15);
        return equals(14).then(pFalse, function(err) {
            expect(err.code).toBe('number.equals');
        });
    });
});