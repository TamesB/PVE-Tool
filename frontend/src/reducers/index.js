import { combineReducers } from 'redux';
import pveitems from './pveitems';
import hoofdstukken from './hoofdstukken';
import paragraven from './paragraven';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    hoofdstukken,
    paragraven,
    pveitems,
    errors,
    messages,
    auth,
    loadingBar: loadingBarReducer,
});