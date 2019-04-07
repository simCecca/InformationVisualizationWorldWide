//reducer is where our actual state is going to go and this is where we check our actions
import { GET_COMPANIES, ADD_COMPANY, DELETE_COMPANY, LOADING_COMPANIES } from "../actions/types";

const initialState = {
    companies: [],
    loading: false //when we fetch data it took a couple of seconds to get it
};

export default function(state = initialState, action) {
    switch (action.type){//access to the parameter from companyActions
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                loading: false
            };
        case DELETE_COMPANY:
            return{
                ...state,
                companies: state.companies.filter(company => company._id !== action.payload)
            };
        case ADD_COMPANY:
            return{
                ...state,
                companies: [action.payload, ...state.companies]
            };
        case LOADING_COMPANIES://cange the loading from false to true
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}