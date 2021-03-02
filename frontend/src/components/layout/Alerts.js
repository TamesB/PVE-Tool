import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component {

    // required prop for this component
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    // if component did get props from state (in this case, if props have changed)
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if(error !== prevProps.error) {
            if (error.msg.name) {alert.error(`Name: ${error.msg.name.join()}`)};
            if (error.msg.email) {alert.error(`Email: ${error.msg.email.join()}`)};
            if (error.msg.message) {alert.error(`Message: ${error.msg.message.join()}`)};
            if (error.msg.non_field_errors) {alert.error(error.msg.non_field_errors.join())};
        };

        if(message !== prevProps.message) {
            if(message.deleteLead) {alert.success(message.deleteLead)};
            if(message.addLead) {alert.success(message.addLead)};
            if(message.passwordsNotMatch) {alert.error(message.passwordsNotMatch)};
        };
    }

    render() {
        return <Fragment />
    }
}

// Make a state with error and message
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts)); 
