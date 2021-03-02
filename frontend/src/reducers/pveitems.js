import { GET_PVEITEMS, DELETE_PVEITEM, ADD_PVEITEM, ADD_PVEITEM_LOADING, ADD_PVEITEM_LOADED, PVEITEMS_LOADING } from '../actions/types.js';

const initialState = {
    items: [],
    isLoading: false,
    itemsIsLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PVEITEM_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PVEITEMS_LOADING:
            return {
                ...state,
                itemsIsLoading: true
            }
        case ADD_PVEITEM_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case GET_PVEITEMS:
            return {
                ...state,
                items: action.payload,
                itemsIsLoading: false
            };
        case DELETE_PVEITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };            
        case ADD_PVEITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false
            };
        default:
            return state;
    }
}