"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var classNames = require("classnames");
var objectAssign = require("object-assign");
var FieldValidation = require("../mixins/FieldValidation");

/**
 * React class to handle the rendering of the InputField
 *
 * @class InputField
 * @constructor
 */
var InputField = React.createClass({

    displayName: "InputField",
    mixins: [FieldValidation],

    propTypes: {
        validators: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.func]),
        validateOn: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        // Put the state inside the empty object
        return objectAssign({}, this.getInitialValidationState());
    },

    render: function render() {
        var classes = classNames(this.getValidationStateClasses());

        var err;
        if (this.state.validation.invalid) {
            err = React.createElement("span", { className: "validationErrorMessage", dangerouslySetInnerHTML: { __html: this.state.validation.err.message } });
        }

        return React.createElement(
            "div",
            { className: "InputField" },
            React.createElement("input", _extends({ type: "text", ref: "field", className: classes }, this.props, this.mapActionsEventsListener())),
            err
        );
    }
});

module.exports = InputField;