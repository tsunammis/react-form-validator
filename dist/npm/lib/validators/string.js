"use strict";

var when = require("when");
var _ = require("lodash");
var validator = require("validator");
var helpers = require("./helpers");

var StringValidators = {

    is: function is() {
        return function (value) {
            return when.promise(function (resolve, reject) {
                if (helpers.isEmpty(value) || _.isString(value)) {
                    resolve(value);
                } else {
                    reject({
                        code: "string.is",
                        message: "the value is not a string"
                    });
                }
            });
        };
    },

    min: function min(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, "limit must be a positive integer");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || _.isString(valueResolved) && valueResolved.length >= limit) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.min",
                            message: "min lenght " + limit
                        });
                    }
                });
            });
        }).bind(this);
    },

    max: function max(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, "limit must be a positive integer");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || _.isString(valueResolved) && valueResolved.length <= limit) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.max",
                            message: "max lenght " + limit
                        });
                    }
                });
            });
        }).bind(this);
    },

    length: function length(limit) {

        helpers.assert(_.isNumber(limit) && limit >= 0, "limit must be a positive integer");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || _.isString(valueResolved) && valueResolved.length === limit) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.length",
                            message: "the lenght have to be " + limit
                        });
                    }
                });
            });
        }).bind(this);
    },

    alphanumeric: function alphanumeric() {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isAlphanumeric(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.alphanumeric",
                            message: "it is not an alphanumeric value"
                        });
                    }
                });
            });
        }).bind(this);
    },

    ip: function ip(version) {

        helpers.assert(version === 4 || version === 6, "version 4 or 6 allowed");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isIP(valueResolved, version)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.ip",
                            message: "it is not an ip"
                        });
                    }
                });
            });
        }).bind(this);
    },

    url: function url() {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isURL(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.url",
                            message: "it is not an url"
                        });
                    }
                });
            });
        }).bind(this);
    },

    equals: function equals(comparison) {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.equals(valueResolved, comparison)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.equals",
                            message: "the both values not matches"
                        });
                    }
                });
            });
        }).bind(this);
    },

    contains: function contains(seed) {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.contains(valueResolved, seed)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.contains",
                            message: "the value does not contain " + seed
                        });
                    }
                });
            });
        }).bind(this);
    },

    "in": function _in(values) {

        helpers.assert(_.isArray(values), "the parameter is not an array");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isIn(valueResolved, values)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.in",
                            message: "the value is not allowed"
                        });
                    }
                });
            });
        }).bind(this);
    },

    creditcard: function creditcard() {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isCreditCard(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.creditcard",
                            message: "it is not a credit card"
                        });
                    }
                });
            });
        }).bind(this);
    },

    email: function email() {

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || validator.isEmail(valueResolved)) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "string.email",
                            message: "it is not an email"
                        });
                    }
                });
            });
        }).bind(this);
    }
};

module.exports = StringValidators;