import React, { Component } from 'react';
import CustomNavbar from './components/CustomNavbar';
import CompaniesList from './components/CompaniesList';
import CompaniesMap from './components/CompaniesMap';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/authActions";

import './style/App.css';


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store = {store}>
                <React.Fragment>

                    <CustomNavbar/>
                    <CompaniesMap/>
                    <CompaniesList/>

                </React.Fragment>
            </Provider>
        );
    }
}

export default App;
