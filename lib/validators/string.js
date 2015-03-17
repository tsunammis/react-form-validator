'use strict';

var when        = require('when');
var _           = require('lodash');
var validator   = require('validator');
var helpers     = require('./helpers');

var StringValidators = {

    is: function() {
        return function(value) {
            return when.promise(function(resolve, reject) {
                if (helpers.isEmpty(value) || _.isString(value)) {
                    resolve(value);
                } else {
                    reject({
                        code: 'string.is',
                        message: 'This value should be a string.'
                    });
                }
            });
        };
    },

    min: function(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, 'limit must be a positive integer');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) ||
                            (_.isString(valueResolved) && valueResolved.length >= limit)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.min',
                            message: 'This value should have greater than or equal ' + limit + ' characters.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    max: function(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, 'limit must be a positive integer');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) ||
                        (_.isString(valueResolved) && valueResolved.length <= limit)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.max',
                            message: 'This value should have less than or equal ' + limit + ' characters.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    length: function(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, 'limit must be a positive integer');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) ||
                        (_.isString(valueResolved) && valueResolved.length === limit)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.length',
                            message: 'This value should have exactly ' + limit + ' characters.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    rangeLength: function(limitMin, limitMax) {

        helpers.assert(_.isNumber(limitMin) && limitMin >= 0, 'limit min must be a positive integer');
        helpers.assert(_.isNumber(limitMax) && limitMax >= 0, 'limit max must be a positive integer');
        helpers.assert(limitMin <= limitMax, 'limit min must be less than or equals to limit max');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) ||
                        (_.isString(valueResolved)
                            && valueResolved.length >= limitMin && valueResolved.length <= limitMax)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.rangeLength',
                            message: 'This value should have between ' + limitMin + ' and ' + limitMax + ' characters.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    alphanumeric: function() {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isAlphanumeric(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.alphanumeric',
                            message: 'This value is not an alphanumeric.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    ip: function(version) {

        helpers.assert(version === 4 || version === 6, 'version 4 or 6 allowed');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isIP(valueResolved, version)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.ip',
                            message: 'This value is not a valid IP'
                        });
                    }
                });
            });
        }.bind(this);
    },

    url: function() {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isURL(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.url',
                            message: 'This value is not a valid URL.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    equals: function(comparison) {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.equals(valueResolved, comparison)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.equals',
                            message: 'This value should be equal to ' + comparison + '.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    contains: function(seed) {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.contains(valueResolved, seed)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.contains',
                            message: 'This value should not contains ' + seed + '.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    in: function(values) {

        helpers.assert(_.isArray(values), 'the parameter is not an array');

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isIn(valueResolved, values)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.in',
                            message: 'This value is not allowed.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    creditcard: function() {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isCreditCard(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.creditcard',
                            message: 'This value is not a valid credit card.'
                        });
                    }
                });
            });
        }.bind(this);
    },

    email: function() {

        return function(value) {
            return this.is()(value).then(function(valueResolved) {
                return when.promise(function(resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isEmail(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: 'string.email',
                            message: 'This value is not a valid email address.'
                        });
                    }
                });
            });
        }.bind(this);
    }
};

module.exports = StringValidators;