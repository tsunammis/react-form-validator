'use strict';

jest.dontMock('lodash');
jest.dontMock('../helpers');

var helpers = require('../helpers');

describe('validators / helpers / assert', function() {

    it('success', function() {
        expect(function() {
            helpers.assert(false, 'boom !!');
        }).toThrow(new Error('boom !!'));
    });

    it('fail', function() {
        expect(function() {
            helpers.assert(true, 'boom !!');
        }).not.toThrow(new Error('boom !!'));
    });

});

describe('validators / helpers / isEmpty', function() {

    it('success with empty string', function() {
        expect(helpers.isEmpty('')).toBe(true);
    });

    it('success with null', function() {
        expect(helpers.isEmpty(null)).toBe(true);
    });

    it('success with undefined', function() {
        expect(helpers.isEmpty(undefined)).toBe(true);
    });

    it('false with not empty string', function() {
        expect(helpers.isEmpty('word')).toBe(false);
    });

    it('false with word', function() {
        expect(helpers.isEmpty(1)).toBe(false);
    });
});

describe('validators / helpers / toNumber', function() {

    it('success with number (string)', function() {
        expect(helpers.toNumber('12')).toBe(12);
    });

    it('success with number', function() {
        expect(helpers.toNumber(14)).toBe(14);
    });

    it('NaN with bad number', function() {
        expect(isNaN(helpers.toNumber('12b'))).toBe(true);
    });

    it('NaN with char', function() {
        expect(isNaN(helpers.toNumber('a'))).toBe(true);
    });

    it('NaN with undefined', function() {
        expect(isNaN(helpers.toNumber())).toBe(true);
    });

    it('NaN with null', function() {
        expect(isNaN(helpers.toNumber(null))).toBe(true);
    });
});

describe('validators / helpers / isNumber', function() {

    it('success with number (string)', function() {
        expect(helpers.isNumber('12')).toBe(true);
    });

    it('success with number', function() {
        expect(helpers.isNumber(14)).toBe(true);
    });

    it('false with char', function() {
        expect(helpers.isNumber('a')).toBe(false);
    });

    it('false with object', function() {
        expect(helpers.isNumber({})).toBe(false);
    });

    it('false with array', function() {
        expect(helpers.isNumber([])).toBe(false);
    });

    it('false with null', function() {
        expect(helpers.isNumber(null)).toBe(false);
    });

    it('false with undefined', function() {
        expect(helpers.isNumber(undefined)).toBe(false);
    });
});

describe('validators / helpers / toNumberIfNotEmpty', function() {

    it('success with number (string)', function() {
        expect(helpers.toNumberIfNotEmpty('12')).toBe(12);
    });

    it('success with number', function() {
        expect(helpers.toNumberIfNotEmpty(14)).toBe(14);
    });

    it('NaN with bad number', function() {
        expect(isNaN(helpers.toNumberIfNotEmpty('12b'))).toBe(true);
    });

    it('NaN with char', function() {
        expect(isNaN(helpers.toNumberIfNotEmpty('a'))).toBe(true);
    });

    it('forward the undefined value', function() {
        expect(helpers.toNumberIfNotEmpty(undefined)).toBe(undefined);
    });

    it('forward the null value', function() {
        expect(helpers.toNumberIfNotEmpty(null)).toBe(null);
    });
});