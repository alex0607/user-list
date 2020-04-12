import { createReducer } from 'redux-create-reducer';
import { CHANGE_FILTER_VALUE, GET_USERS_SUCCESS } from '../../constants/users';

const initialState = {
  filter: '',
  usersList: []
};

const usersReducer = createReducer(initialState, {
  [CHANGE_FILTER_VALUE]: (state, action) => ({
    ...state,
    filter: action.payload
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    usersList: action.payload
  })
});

export default usersReducer;
