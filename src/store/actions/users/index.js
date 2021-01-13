import axios from 'axios';
import {
    CHANGE_FILTER_VALUE,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS
} from '../../constants/users';

export const changeFilterValue = value => dispatch => {
    dispatch({
        type: CHANGE_FILTER_VALUE,
        payload: value
    })
};

export const getUsers = dispatch => {
    axios.get('https://randomuser.me/api?results=100', {
        headers: {
            'Access-Control-Allow-Origin': 'origin-list',
        }
    })
        .then(res => {
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: res.data.results
            });
        })
        .catch(err => {
            dispatch({
                type: GET_USERS_ERROR,
                message: err.message
            });
        });
};
