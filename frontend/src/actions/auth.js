import axios from 'axios';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // Set User Loading state
    dispatch({ type: USER_LOADING });
    
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios
        .get("/api/auth/user", tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

// login user
export const login = (username, password) => dispatch => {
    dispatch({ type: USER_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    // Request Body
    const body = JSON.stringify({ username, password });
      

    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

// Register user
export const register = ({username, password, email}) => dispatch => {
    dispatch({ type: USER_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    // Request Body
    const body = JSON.stringify({ username, password, email });

    axios
        .post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // null as body for some reason
    axios
        .post("/api/auth/logout/", null, tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Init header
    const config = {
        headers: {
        }
    }

    // If token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    };

    return config;
}

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}