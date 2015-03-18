'use strict';

var React           = require('react');
var classNames      = require('classnames');
var objectAssign    = require('object-assign');
var FieldValidation = require('../mixins/FieldValidation');

/**
 * React class to handle the rendering of the PasswordField
 *
 * @class PasswordField
 * @constructor
 */
var PasswordField = React.createClass({

    displayName: 'PasswordField',
    mixins: [FieldValidation],

    propTypes: {
        validators: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ]),
        validateOn: React.PropTypes.string
    },

    getInitialState: function() {
        // Put the state inside the empty object
        return objectAssign({}, this.getInitialValidationState());
    },

    getValue: function() {
        return this.refs.field.getDOMNode().value;
    },

    render: function() {
        var classes = classNames(this.getValidationStateClasses());

        var err;
        if (this.state.validation.invalid) {
            err = (<span className="validationErrorMessage" dangerouslySetInnerHTML={{__html: this.state.validation.err.message}} />);
        }

        return (
            <div className="PasswordField">
                <input type="password" ref="field" className={classes} {...this.props} {...this.mapActionsEventsListener()} />
                {err}
            </div>
        );
    }
});

module.exports = PasswordField;
