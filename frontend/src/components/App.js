import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect 
    } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LoadingBar from 'react-redux-loading-bar'

import HeaderMenu from './layout/HeaderMenu';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';

import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        const article_padding = {
            padding: "0 5vw 0 5vw"
        }

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                    <Fragment>
                        <LoadingBar />
                        <HeaderMenu />
                        <div style={article_padding}>
                            <Alerts />
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));