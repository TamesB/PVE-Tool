import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'
import { Fragment } from 'react/cjs/react.production.min';

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool
    }

    // Logic after form submitted
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

    }

    // Allows input
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, password } = this.state;

        return (
            <div>
            <Grid columns={2} relaxed='very' stackable verticalAlign='middle' textAlign='center' style={{ height: '90vh' }}>
            <Grid.Column style={{ padding: '0 15vw 0 15vw' }}>
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
                  icon='lock'
                  iconPosition='left'
                  label='Password'
                  name="password"
                  type='password'
                  onChange={this.onChange}
                  value={password}
                />
              <Button type="submit" content='Login' loading={this.props.isLoading} primary></Button>
              </Form>
            </Grid.Column>
      
            <MediaQuery maxWidth={768}>
                  <Divider horizontal verticalAlign='middle'>Or</Divider>
            </MediaQuery>

            <Grid.Column verticalAlign='middle' style={{ padding: '15vw' }}>
              <Button as={Link} to="/register" content='Sign up' icon='signup' size='big' />
            </Grid.Column>
            </Grid>

            <MediaQuery minWidth={768}>
              <Divider vertical>Or</Divider>
            </MediaQuery>

            </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { login })(Login);