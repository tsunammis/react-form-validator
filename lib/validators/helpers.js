'use strict';

var _ = require('lodash');

/**
 * Throw an exception if the condition is not satisfied
 * @param condition
 * @param message
 */
var _assert = function(condition, message) {
    if (condition) {
        return;
    }
    throw new Error(message);
};

/**
 * Check if the value is empty (null, undefined or empty string)
 *
 * @param value
 * @returns boolean
 */
var _isEmpty = function(value) {
    return (_.isString(value) && _.isEmpty(value)) || value === null || value === undefined;
};

/**
 * Cast a value to a number
 *
 * @param value
 * @returns {Number|NaN}
 */
var _toNumber = function(value) {
    if (_.isString(value)) {
        var valueParsed = parseFloat(value);
        if (isNaN(valueParsed) || valueParsed.toString() !== value) {
            value = NaN;
        } else {
            value = valueParsed;
        }
    }
    return _.isNumber(value) ? value : NaN;
};

/**
 * Check if the value is a finite number (accept number in string)
 *
 * @param value
 * @returns boolean
 */
var _isNumber = function(value) {
    var number = _toNumber(value);
    return !isNaN(number) && _.isFinite(number);
};

/**
 * Cast the value to a number if it not empty
 *
 * @param value
 * @returns {*|Number}
 */
var _toNumberIfNotEmpty = function(value) {
    if (_isEmpty(value)) {
        return value;
    } else {
        return _toNumber(value);
    }
};

module.exports = {
    assert: _assert,
    isEmpty: _isEmpty,
    toNumber: _toNumber,
    isNumber: _isNumber,
    toNumberIfNotEmpty: _toNumberIfNotEmpty
};