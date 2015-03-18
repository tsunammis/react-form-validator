"use strict";

var when = require("when");
var _ = require("lodash");
var parallel = require("when/parallel");

var FormValidation = {

    validateForm: function validateForm() {
        var elements = [];

        _.forEach(this.refs, function (element) {
            if ("hasFieldValidation" in element && element.hasFieldValidation && "props" in element && "name" in element.props) {
                elements.push(function () {
                    return element.validate().then(function (value) {
                        return when.resolve({
                            value: value,
                            name: element.props.name
                        });
                    });
                });
            }
        });

        return parallel(elements).then(function (values) {
            var data = {};
            _.forEach(values, function (d) {
                data[d.name] = d.value;
            });
            return when.resolve(data);
        });
    } };

module.exports = FormValidation;