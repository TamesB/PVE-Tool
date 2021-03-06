import { combineReducers } from 'redux';
import pveitems from './pveitems';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    pveitems,
    errors,
    messages,
    auth,
    loadingBar: loadingBarReducer,
});