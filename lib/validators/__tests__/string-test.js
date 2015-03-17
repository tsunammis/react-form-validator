'use strict';

jest.autoMockOff();

var string = require('../string');

var pFalse = function() {
    throw new Error('Promise must be rejected');
};

describe('validators / string / is()', function() {

    pit('success with empty string', function() {
        var is = string.is();
        return is('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var is = string.is();
        return is(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var is = string.is();
        return is(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with string', function() {
        var is = string.is();
        return is('Chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('Chuck');
        });
    });

    pit('fail with number', function() {
        var is = string.is();
        return is(12).then(pFalse, function(err) {
            expect(err.code).toBe('string.is');
        });
    });

    pit('fail with object', function() {
        var is = string.is();
        return is({}).then(pFalse, function(err) {
            expect(err.code).toBe('string.is');
        });
    });

    pit('fail with array', function() {
        var is = string.is();
        return is([]).then(pFalse, function(err) {
            expect(err.code).toBe('string.is');
        });
    });
});

describe('validators / string / min()', function() {

    pit('success with empty string', function() {
        var min = string.min(5);
        return min('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var min = string.min(5);
        return min(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var min = string.min(5);
        return min(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string with length upper than 5', function() {
        var min = string.min(5);
        return min('Chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('Chuck');
        });
    });

    pit('fail with a string with length lower than 5', function() {
        var min = string.min(5);
        return min('node').then(pFalse, function(err) {
            expect(err.code).toBe('string.min');
        });
    });

    it('fail when the limit is not a number', function() {
        expect(function() {
            string.min('char')
        }).toThrow(new Error('limit must be a positive integer'));
    });

    it('fail when the limit is not positive', function() {
        expect(function() {
            string.min(-10)
        }).toThrow(new Error('limit must be a positive integer'));
    });
});

describe('validators / string / max()', function() {

    pit('success with empty string', function() {
        var max = string.max(5);
        return max('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var max = string.max(5);
        return max(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var max = string.max(5);
        return max(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string with length upper than 5', function() {
        var max = string.max(5);
        return max('Chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('Chuck');
        });
    });

    pit('fail with a string with length lower than 5', function() {
        var max = string.max(5);
        return max('Norris').then(pFalse, function(err) {
            expect(err.code).toBe('string.max');
        });
    });

    it('fail when the limit is not a number', function() {
        expect(function() {
            string.max('char')
        }).toThrow(new Error('limit must be a positive integer'));
    });

    it('fail when the limit is not positive', function() {
        expect(function() {
            string.max(-10)
        }).toThrow(new Error('limit must be a positive integer'));
    });
});

describe('validators / string / length()', function() {

    pit('success with empty string', function() {
        var length = string.length(5);
        return length('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var length = string.length(5);
        return length(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var length = string.length(5);
        return length(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string with length upper than 5', function() {
        var length = string.length(5);
        return length('Chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('Chuck');
        });
    });

    pit('fail with a string with length lower than 5', function() {
        var length = string.length(5);
        return length('Norris').then(pFalse, function(err) {
            expect(err.code).toBe('string.length');
        });
    });

    it('fail when the limit is not a number', function() {
        expect(function() {
            string.length('char')
        }).toThrow(new Error('limit must be a positive integer'));
    });

    it('fail when the limit is not positive', function() {
        expect(function() {
            string.length(-10)
        }).toThrow(new Error('limit must be a positive integer'));
    });
});

describe('validators / string / alphanumeric()', function() {

    pit('success with empty string', function() {
        var alphanumeric = string.alphanumeric();
        return alphanumeric('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var alphanumeric = string.alphanumeric();
        return alphanumeric(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var alphanumeric = string.alphanumeric();
        return alphanumeric(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string with alphanumeric value', function() {
        var alphanumeric = string.alphanumeric();
        return alphanumeric('abcdef123456789876').then(function(valueResolved) {
            expect(valueResolved).toBe('abcdef123456789876');
        });
    });

    pit('fail without an alphanumeric string', function() {
        var alphanumeric = string.alphanumeric();
        return alphanumeric('_abcde').then(pFalse, function(err) {
            expect(err.code).toBe('string.alphanumeric');
        });
    });
});

describe('validators / string / ip()', function() {

    pit('success with empty string', function() {
        var ip = string.ip(4);
        return ip('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var ip = string.ip(4);
        return ip(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var ip = string.ip(4);
        return ip(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with an IP v4', function() {
        var ip = string.ip(4);
        return ip('192.168.0.1').then(function(valueResolved) {
            expect(valueResolved).toBe('192.168.0.1');
        });
    });

    pit('success with an IP v6', function() {
        var ip = string.ip(6);
        return ip('0e:40:08:b4:aa:d2').then(function(valueResolved) {
            expect(valueResolved).toBe('0e:40:08:b4:aa:d2');
        });
    });

    pit('fail with a value which is not an IP', function() {
        var ip = string.ip(4);
        return ip('not an IP').then(pFalse, function(err) {
            expect(err.code).toBe('string.ip');
        });
    });

    it('fail when the IP version is not 4 or 6', function() {
        expect(function() {
            string.ip(5)
        }).toThrow(new Error('version 4 or 6 allowed'));
    });
});

describe('validators / string / url()', function() {

    pit('success with empty string', function() {
        var url = string.url();
        return url('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var url = string.url();
        return url(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var url = string.url();
        return url(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with an URL', function() {
        var url = string.url();
        return url('http://google.com').then(function(valueResolved) {
            expect(valueResolved).toBe('http://google.com');
        });
    });

    pit('success with a secure URL', function() {
        var url = string.url();
        return url('https://google.com').then(function(valueResolved) {
            expect(valueResolved).toBe('https://google.com');
        });
    });

    pit('fail with a value which is not an URL', function() {
        var url = string.url();
        return url('not an URL').then(pFalse, function(err) {
            expect(err.code).toBe('string.url');
        });
    });
});

describe('validators / string / equals()', function() {

    pit('success with empty string', function() {
        var equals = string.equals();
        return equals('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var equals = string.equals();
        return equals(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var equals = string.equals();
        return equals(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string', function() {
        var equals = string.equals('chuck');
        return equals('chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('chuck');
        });
    });

    pit('fail with a value which is not an URL', function() {
        var equals = string.equals('foo');
        return equals('bar').then(pFalse, function(err) {
            expect(err.code).toBe('string.equals');
        });
    });
});

describe('validators / string / contains()', function() {

    pit('success with empty string', function() {
        var contains = string.contains('foo');
        return contains('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var contains = string.contains('foo');
        return contains(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var contains = string.contains('foo');
        return contains(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string', function() {
        var contains = string.contains('chuck');
        return contains('I am chuck norris').then(function(valueResolved) {
            expect(valueResolved).toBe('I am chuck norris');
        });
    });

    pit('success with a string (start with the seed)', function() {
        var contains = string.contains('chuck');
        return contains('chuck is the bis boss').then(function(valueResolved) {
            expect(valueResolved).toBe('chuck is the bis boss');
        });
    });

    pit('success with a string (end with the seed)', function() {
        var contains = string.contains('chuck');
        return contains('norris chuck').then(function(valueResolved) {
            expect(valueResolved).toBe('norris chuck');
        });
    });

    pit('fail with a value which is not an URL', function() {
        var contains = string.contains('foo');
        return contains('fo bar').then(pFalse, function(err) {
            expect(err.code).toBe('string.contains');
        });
    });
});

describe('validators / string / in()', function() {

    pit('success with empty string', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator('foo').then(function(valueResolved) {
            expect(valueResolved).toBe('foo');
        });
    });

    pit('success with a string contain in the array', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator('foo').then(function(valueResolved) {
            expect(valueResolved).toBe('foo');
        });
    });

    pit('fail with a value which is not an URL', function() {
        var inValidator = string.in(['foo', 'bar']);
        return inValidator('foobar').then(pFalse, function(err) {
            expect(err.code).toBe('string.in');
        });
    });

    it('fail when the parameter is not an array', function() {
        expect(function() {
            string.in('foo')
        }).toThrow(new Error('the parameter is not an array'));
    });
});

describe('validators / string / email()', function() {

    pit('success with empty string', function() {
        var email = string.email();
        return email('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var email = string.email();
        return email(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var email = string.email();
        return email(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a good email', function() {
        var email = string.email();
        return email('chuck.norris@fake.com').then(function(valueResolved) {
            expect(valueResolved).toBe('chuck.norris@fake.com');
        });
    });

    pit('fail with an invalid email', function() {
        var email = string.email();
        return email('chuck.com').then(pFalse, function(err) {
            expect(err.code).toBe('string.email');
        });
    });
});

describe('validators / string / creditcard()', function() {

    pit('success with empty string', function() {
        var creditcard = string.creditcard();
        return creditcard('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var creditcard = string.creditcard();
        return creditcard(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var creditcard = string.creditcard();
        return creditcard(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('should validate', function() {
        var creditcard = string.creditcard();
        return creditcard('4716461583322103').then(function(valueResolved) {
            expect(valueResolved).toBe('4716461583322103');
        });
    });

    pit('should validate 2', function() {
        var creditcard = string.creditcard();
        return creditcard('4929 7226 5379 7141').then(function(valueResolved) {
            expect(valueResolved).toBe('4929 7226 5379 7141');
        });
    });

    pit('should validate 3', function() {
        var creditcard = string.creditcard();
        return creditcard('4716-2210-5188-5662').then(function(valueResolved) {
            expect(valueResolved).toBe('4716-2210-5188-5662');
        });
    });

    pit('fail with an invalid email', function() {
        var creditcard = string.creditcard();
        return creditcard('foo').then(pFalse, function(err) {
            expect(err.code).toBe('string.creditcard');
        });
    });
});

describe('validators / string / rangeLength()', function() {

    pit('success with empty string', function() {
        var rangeLength = string.rangeLength(2, 5);
        return rangeLength('').then(function(valueResolved) {
            expect(valueResolved).toBe('');
        });
    });

    pit('success with null', function() {
        var rangeLength = string.rangeLength(2, 5);
        return rangeLength(null).then(function(valueResolved) {
            expect(valueResolved).toBe(null);
        });
    });

    pit('success with undefined', function() {
        var rangeLength = string.rangeLength(2, 5);
        return rangeLength(undefined).then(function(valueResolved) {
            expect(valueResolved).toBe(undefined);
        });
    });

    pit('success with a string with length between 3 and 5', function() {
        var rangeLength = string.rangeLength(3, 5);
        return rangeLength('Chuc').then(function(valueResolved) {
            expect(valueResolved).toBe('Chuc');
        });
    });

    pit('fail with a string with length greater than 5', function() {
        var rangeLength = string.rangeLength(3, 5);
        return rangeLength('Norris').then(pFalse, function(err) {
            expect(err.code).toBe('string.rangeLength');
        });
    });

    pit('fail with a string with length lower than 3', function() {
        var rangeLength = string.rangeLength(3, 5);
        return rangeLength('No').then(pFalse, function(err) {
            expect(err.code).toBe('string.rangeLength');
        });
    });

    it('fail when the limit (min or max) is not a number', function() {
        expect(function() {
            string.rangeLength('char', 2)
        }).toThrow(new Error('limit min must be a positive integer'));

        expect(function() {
            string.rangeLength(2, 'char')
        }).toThrow(new Error('limit max must be a positive integer'));
    });

    it('fail when the limit min is not lower than limit max', function() {
        expect(function() {
            string.rangeLength(5, 3)
        }).toThrow(new Error('limit min must be less than or equals to limit max'));
    });
});