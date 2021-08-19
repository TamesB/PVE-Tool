import { GET_PARAGRAVEN, DELETE_PARAGRAAF, ADD_PARAGRAAF, ADD_PARAGRAAF_LOADING, ADD_PARAGRAAF_LOADED, PARAGRAVEN_LOADING } from '../actions/types.js';

const initialState = {
    paragraven: [],
    isLoading: false,
    paragravenIsLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PARAGRAAF_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PARAGRAVEN_LOADING:
            return {
                ...state,
                paragravenIsLoading: true
            }
        case ADD_PARAGRAAF_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case GET_PARAGRAVEN:
            return {
                ...state,
                paragraven: action.payload,
                paragravenIsLoading: false
            };
        case DELETE_PARAGRAAF:
            return {
                ...state,
                paragraven: state.paragraven.filter(item => item.id !== action.payload),
            };            
        case ADD_PARAGRAAF:
            return {
                ...state,
                paragraven: [...state.paragraven, action.payload],
                isLoading: false
            };
        default:
            return state;
    }
}