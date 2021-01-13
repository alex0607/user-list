import { combineReducers } from 'redux';

import uiReducer from './ui';
import usersReducer from './users';

export default combineReducers({
    ui: uiReducer,
    users: usersReducer
});
