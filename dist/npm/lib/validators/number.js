"use strict";

var when = require("when");
var _ = require("lodash");
var helpers = require("./helpers");

var NumberValidators = {

    is: function is() {
        return function (value) {
            return when.promise(function (resolve, reject) {
                if (helpers.isEmpty(value) || helpers.isNumber(value)) {
                    resolve(helpers.toNumberIfNotEmpty(value));
                } else {
                    reject({
                        code: "number.is",
                        message: "it is not a number"
                    });
                }
            });
        };
    },

    max: function max(limit) {

        helpers.assert(_.isNumber(limit), "limit must be a number");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || valueResolved <= limit) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "number.max",
                            message: "max " + limit
                        });
                    }
                });
            });
        }).bind(this);
    },

    min: function min(limit) {

        helpers.assert(_.isNumber(limit), "limit must be a number");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || valueResolved >= limit) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "number.min",
                            message: "min " + limit
                        });
                    }
                });
            });
        }).bind(this);
    },

    equals: function equals(seed) {

        helpers.assert(_.isNumber(seed), "seed must be a number");

        return (function (value) {
            return this.is()(value).then(function (valueResolved) {
                return when.promise(function (resolve, reject) {
                    if (helpers.isEmpty(valueResolved) || valueResolved === seed) {
                        resolve(valueResolved);
                    } else {
                        reject({
                            code: "number.equals",
                            message: "the value is not equals to " + seed
                        });
                    }
                });
            });
        }).bind(this);
    }
};

module.exports = NumberValidators;