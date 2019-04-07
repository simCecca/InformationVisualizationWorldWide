import { GET_COMPANIES, ADD_COMPANY, DELETE_COMPANY, LOADING_COMPANIES } from "./types";
//axios is an http client, used to fetch api
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getCompanies = () => dispatch => {
    dispatch(setCompaniesLoading());
    axios
        .get('/api/companies')//return a promise
        .then(res => dispatch({
            type: GET_COMPANIES,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteCompany = (id) => (dispatch, getState)=> {
    axios.delete(`/api/companies/${id}`, tokenConfig(getState)).then( res => dispatch({
        type: DELETE_COMPANY,
        payload: id //we can access to this payload from action.payload
    }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addCompany = (company) => (dispatch, getState) => { //company arrive from company model component
    //post request
    axios
        .post('/api/companies', company, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_COMPANY,
            payload: res.data // the payload is the company from the server
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setCompaniesLoading = () => {
    return {
        type: LOADING_COMPANIES
    }
};