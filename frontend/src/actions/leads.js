import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, ADD_LEAD_LOADING, ADD_LEAD_LOADED } from './types';
import { tokenConfig } from './auth';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get('/api/leads/', tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.delete(`/api/leads/${id}/`, tokenConfig(getState), config)
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

// ADD LEAD
export const addLead = lead => (dispatch, getState) => {
    dispatch({ type: ADD_LEAD_LOADING });

    const formData = new FormData();

    formData.append("name", lead.name);
    formData.append("email", lead.email);
    formData.append("message", lead.message);

    if(lead.attachment){
        formData.append("attachment", lead.attachment);
    }
    axios
        .post("/api/leads/", formData, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Added' }));
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status), dispatch({ type: ADD_LEAD_LOADED })));

};