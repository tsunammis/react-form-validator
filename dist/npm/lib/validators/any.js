"use strict";

var when = require("when");
var _ = require("lodash");
var helpers = require("./helpers");

var AnyValidators = {

    notEmpty: function notEmpty() {
        return function (value) {
            return when.promise(function (resolve, reject) {
                if (!helpers.isEmpty(value)) {
                    resolve();
                } else {
                    reject({
                        code: "any.notEmpty",
                        message: "empty value it is not valid"
                    });
                }
            });
        };
    }
};

module.exports = AnyValidators;