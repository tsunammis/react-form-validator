"use strict";

var when = require("when");
var _ = require("lodash");
var helpers = require("../helpers");

var AnyValidators = {

    notBlank: function notBlank() {
        return function (value) {
            return when.promise(function (resolve, reject) {
                if (!helpers.isEmpty(value)) {
                    resolve();
                } else {
                    reject({
                        code: "any.notBlank",
                        message: "This value should not be blank."
                    });
                }
            });
        };
    }
};

module.exports = AnyValidators;