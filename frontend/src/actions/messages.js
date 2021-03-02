import { CREATE_MESSAGE, GET_ERRORS } from './types';

// Create message
export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    }
}

// Return Errors
export const returnErrors = msg => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}
