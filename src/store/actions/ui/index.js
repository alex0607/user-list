import { TOGGLE_BACK_ARROW } from '../../constants/ui';

export const toggleBackArrow = () => dispatch => {
    dispatch({
        type: TOGGLE_BACK_ARROW
    })
};
