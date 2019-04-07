//main point of this root reducer is to bring together all of the reducers.
import { combineReducers } from 'redux';
import companyReducer from './companyReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({//object with the different reducers
    company: companyReducer,
    error: errorReducer,
    auth: authReducer
})