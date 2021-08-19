import { GET_HOOFDSTUKKEN, DELETE_HOOFDSTUK, ADD_HOOFDSTUK, ADD_HOOFDSTUK_LOADING, ADD_HOOFDSTUK_LOADED, HOOFDSTUKKEN_LOADING } from '../actions/types.js';

const initialState = {
    hoofdstukken: [],
    isLoading: false,
    hoofdstukkenIsLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_HOOFDSTUK_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case HOOFDSTUKKEN_LOADING:
            return {
                ...state,
                hoofdstukkenIsLoading: true
            }
        case ADD_HOOFDSTUK_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case GET_HOOFDSTUKKEN:
            return {
                ...state,
                hoofdstukken: action.payload,
                hoofdstukkenIsLoading: false
            };
        case DELETE_HOOFDSTUK:
            return {
                ...state,
                hoofdstukken: state.hoofdstukken.filter(item => item.id !== action.payload),
            };            
        case ADD_HOOFDSTUK:
            return {
                ...state,
                hoofdstukken: [...state.hoofdstukken, action.payload],
                isLoading: false
            };
        default:
            return state;
    }
}