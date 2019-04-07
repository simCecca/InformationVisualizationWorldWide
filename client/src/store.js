//holds application state; allow access to state via getState(); allows state to be updates via dispatch(action); register listeners via subscribe(listener);

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleweare = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleweare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;