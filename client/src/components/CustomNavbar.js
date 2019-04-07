import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModel from './auth/registerModel'
import Logout from './auth/Loguot';
import LoginModel from './auth/LoginModel';
//connect with redux for understanding if the user is logged or not
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class CustomNavbar extends Component{
    constructor(props){
        super(props);
        this.state ={
            isOpen: false
        };

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render(){

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className = "navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModel/>
                </NavItem>
                <NavItem>
                    <LoginModel/>
                </NavItem>
            </Fragment>
        );

        return (
                <Navbar color="dark" dark expand = "sm" className="md-5">
                    <Container>
                        <NavbarBrand href="/">Information Visualization World Wide</NavbarBrand>
                        <NavbarToggler onClick={ this.toggle }/>
                        <Collapse isOpen={ this.state.isOpen } navbar>
                            <Nav className = "ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
        );
    }



}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(CustomNavbar);