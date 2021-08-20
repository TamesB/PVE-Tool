import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_PVEITEMS, PVEITEMS_LOADING, DELETE_PVEITEM, ADD_PVEITEM, ADD_PVEITEM_LOADING, ADD_PVEITEM_LOADED } from './types';
import { tokenConfig } from './auth';

// GET PVEITEMS
export const getItems = (versie_id, hoofdstuk_id, paragraaf_id) => (dispatch, getState) => {
    dispatch({ type: PVEITEMS_LOADING });

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get(`/api/pveitems/?versie=${versie_id}&hoofdstuk=${hoofdstuk_id}&paragraaf=${paragraaf_id}`, tokenConfig(getState), config)
        .then(res => {
            dispatch({
                type: GET_PVEITEMS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

// DELETE PVEITEM
export const deleteItem = id => (dispatch, getState) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.delete(`/api/pveitems/${id}/`, tokenConfig(getState), config)
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Item verwijderd' }));
            dispatch({
                type: DELETE_PVEITEM,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

// ADD PVEITEM
export const addItem = item => (dispatch, getState) => {
    dispatch({ type: ADD_PVEITEM_LOADING });

    const formData = new FormData();

    formData.append("versie", item.versie);
    formData.append("hoofdstuk", item.hoofdstuk);
    formData.append("paragraaf", item.paragraaf);
    formData.append("inhoud", item.additeminhoud);
    formData.append("basisregel", item.basisregel);

    if(item.bijlage){
        formData.append("bijlage", item.bijlage);
    }
    axios
        .post("/api/pveitems/", formData, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Item toegevoegd' }));
            dispatch({
                type: ADD_PVEITEM,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status), dispatch({ type: ADD_PVEITEM_LOADED })));

};