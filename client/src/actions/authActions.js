import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    LOADED_USER,
    LOADING_USER,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, LOGOUT_SUCCESS
} from "./types";

//check token & load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: LOADING_USER });
    //fetch the user and pass the token

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: LOADED_USER,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//register user
export const register = ({ name, email, password }) => dispatch => {
    //post request to send a json to the server . headers
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };

    //request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data //user data + token
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));
            dispatch({
                type: REGISTER_FAIL
            })
        })

};

//login user
export const login = ({ email, password }) => dispatch => {
    //post request to send a json to the server . headers
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };

    //request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data //user data + token
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            })
        })

};

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const tokenConfig = getState => {
    //get the token from localsstorage
    const token = getState().auth.token;
    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    //if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;//the token is automatically in the local storage
    }
    return config;
};


