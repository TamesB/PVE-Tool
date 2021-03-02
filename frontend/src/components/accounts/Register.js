import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { Fragment } from 'react/cjs/react.production.min';
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    // Logic after form submitted (also do check-logic here)
    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;

        if(password !== password2) {
            this.props.createMessage({passwordsNotMatch: "Passwords do not match."});
        } else {
            // make account
            const newUser = {
                username,
                password,
                email
            }

            this.props.register(newUser);
        }
    }

    // Allows input
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, email, password, password2 } = this.state;
        return (
            <Fragment>
            <Header as='h2'>Register</Header>
            <Form onSubmit={this.onSubmit}>
            <Form.Input
              icon='user'
              iconPosition='left'
              label='Username'
              placeholder='Username'
              name="username"
              onChange={this.onChange}
              value={username}
            />
            <Form.Input
              icon='mail'
              iconPosition='left'
              label='Email'
              placeholder='E-mail'
              name="email"
              type='email'
              onChange={this.onChange}
              value={email}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
              name="password"
              type='password'
              onChange={this.onChange}
              value={password}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
              name="password2"
              type='password'
              onChange={this.onChange}
              value={password2}
            />
  
            <Button type="submit" content='Register' primary />
          </Form>
          </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);