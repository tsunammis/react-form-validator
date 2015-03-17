'use strict';

var sequence        = require('when/sequence');
var _               = require('lodash');
var objectAssign    = require('object-assign');

var FieldValidation = {

    getInitialValidationState: function() {
        return {
            validation: {
                pending: false,
                valid: true,
                invalid: false
            }
        };
    },

    isValid: function() {
        return this.state.validation.valid;
    },

    getValidationStateClasses: function() {
        return {
            validationPending: this.state.validation.pending,
            validationValid: this.state.validation.valid,
            validationInvalid: this.state.validation.invalid
        };
    },

    getValidors: function() {
        var validators = [];

        if (_.isFunction(this.props.validators)) {
            validators.push(this.props.validators);
        } else if (_.isArray(this.props.validators)) {
            validators = this.props.validators;
        }

        return validators;
    },

    /**
     * Update the "validation state" of the component state
     */
    updateValidationState: function() {
        var updateValidationState = function(value) {
            var validationState = objectAssign({}, this.state.validation, value);
            var state = objectAssign({}, this.state);
            state.validation = validationState;
            this.setState(state);
        }.bind(this);

        return {
            pending: function() {
                updateValidationState({
                    pending: true
                });
            },
            valid: function() {
                updateValidationState({
                    pending: false,
                    valid: true,
                    invalid: false
                });
            },
            invalid: function(err) {
                updateValidationState({
                    pending: false,
                    valid: false,
                    invalid: true,
                    err: err
                });
            }
        };
    },

    validate: function() {
        var value = this.refs.field.getDOMNode().value;
        var validators = this.getValidors();

        // Mark the validation as "pending"
        this.updateValidationState().pending();
        sequence(validators, value)
            .then(function() {
                this.updateValidationState().valid();
            }.bind(this), function(err) {
                this.updateValidationState().invalid(err);
            }.bind(this));
    },

    mapActionsEventsListener: function() {
        // if the prop 'validateOn' is empty
        if(_.isEmpty(this.props.validateOn)) {
            return {};
        }

        var events = this.props.validateOn.split(' ');
        var validateOnEvents = {};
        _.forEach(events, function(eventName) {
            // Check if the event is supported
            // http://facebook.github.io/react/docs/events.html#supported-events
            validateOnEvents[eventName] = function(e) {
                this.validate();
            }.bind(this);
        }.bind(this));

        return validateOnEvents;
    }

};

module.exports = FieldValidation;