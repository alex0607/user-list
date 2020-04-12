import { createReducer } from 'redux-create-reducer';
import { TOGGLE_BACK_ARROW } from '../../constants/ui';

const initialState = {
    showBackArrow: false
};

const uiReducer = createReducer(initialState, {
    [TOGGLE_BACK_ARROW]: (state) => ({
        ...state,
        showBackArrow: !state.showBackArrow
    })
});

export default uiReducer;
