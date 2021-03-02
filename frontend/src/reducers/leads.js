import { GET_LEADS, DELETE_LEAD, ADD_LEAD, ADD_LEAD_LOADING, ADD_LEAD_LOADED } from '../actions/types.js';

const initialState = {
    leads: [],
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_LEAD_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ADD_LEAD_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case GET_LEADS:
            return {
                ...state,
                leads: action.payload,
            };
        case DELETE_LEAD:
            return {
                ...state,
                leads: state.leads.filter(lead => lead.id !== action.payload),
            };            
        case ADD_LEAD:
            return {
                ...state,
                leads: [...state.leads, action.payload],
                isLoading: false
            };
        default:
            return state;
    }
}