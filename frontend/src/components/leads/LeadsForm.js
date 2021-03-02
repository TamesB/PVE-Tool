import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads'
import { Fragment } from 'react/cjs/react.production.min';
import { Header, Form, Button, Label } from 'semantic-ui-react'

export class LeadsForm extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        attachment: null,
    }
    
    static propTypes = {
        addLead: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    fileChange = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, email, message, attachment } = this.state;
        const lead = { name, email, message, attachment };
        this.props.addLead(lead)
        this.setState({
            name: "",
            email: "",
            message: "",
            attachment: null,
        })
    };

    render() {
        const { name, email, message, attachment } = this.state;
        const form_padding = {
            padding: "0 10vw 0 10vw"
        }
        return (
            <Fragment>
                    <div style={form_padding}>
                        <Header as='h2'>Add Lead</Header>
                        <Form onSubmit={this.onSubmit}>
                                <Form.Input
                                    type="text"
                                    name="name"
                                    label="Name"
                                    onChange={this.onChange}
                                    value={name}
                                />  
                                <Form.Input
                                    type="email"
                                    name="email"
                                    label="E-mail"
                                    onChange={this.onChange}
                                    value={email}
                                />  
                                <Form.Input
                                    type="text"
                                    name="message"
                                    label="Message"
                                    onChange={this.onChange}
                                    value={message}
                                />  
                                <Form.Input 
                                type="file" 
                                id="file" 
                                name="attachment"
                                hidden 
                                label="Upload Attachment"
                                onChange={this.fileChange} 
                                />
                                <Button type="submit" loading={this.props.isLoading} primary>Submit</Button>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.leads.isLoading
});

export default connect(mapStateToProps, { addLead })(LeadsForm);
