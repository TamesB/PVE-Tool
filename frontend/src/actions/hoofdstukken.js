import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_HOOFDSTUKKEN, DELETE_HOOFDSTUK, ADD_HOOFDSTUK, ADD_HOOFDSTUK_LOADING, ADD_HOOFDSTUK_LOADED, HOOFDSTUKKEN_LOADING } from '../actions/types.js';
import { tokenConfig } from './auth';


// GET HOOFDSTUKKEN
export const getHoofdstukken = (versie_id) => (dispatch, getState) => {
    dispatch({ type: HOOFDSTUKKEN_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get(`/api/pvehfst/?versie=${versie_id}`, tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: GET_HOOFDSTUKKEN,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};
