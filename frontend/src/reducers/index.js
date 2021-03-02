import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    leads,
    errors,
    messages,
    auth,
    loadingBar: loadingBarReducer,
});