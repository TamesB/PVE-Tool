import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_PARAGRAVEN, DELETE_PARAGRAAF, ADD_PARAGRAAF, ADD_PARAGRAAF_LOADING, ADD_PARAGRAAF_LOADED, PARAGRAVEN_LOADING } from '../actions/types.js';
// GET HOOFDSTUKKEN
export const getParagraven = (versie_id, hoofdstuk_id) => (dispatch, getState) => {
    dispatch({ type: PARAGRAVEN_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get(`/api/pveprgrf/?versie=${versie_id}&hoofdstuk=${hoofdstuk_id}`, tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: GET_PARAGRAVEN,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};
