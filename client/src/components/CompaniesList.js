import React, { Component } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CompanyModel from './CompanyModel';
import { connect } from 'react-redux';
import { getCompanies, deleteCompany } from "../actions/companyActions";
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import '../style/CompaniesList.css';

//puttint the static data inside redux
class CompaniesList extends Component {

    static propTypes = {
        getCompanies: PropTypes.func.isRequired,
        company: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount(){
        this.props.getCompanies();
    }

    onDeleteClick = (id) => {
        this.props.deleteCompany(id);
    };

    render(){
        const { companies } = this.props.company;
        return (
            <Container>
                <Row>
                    <Col><p><h2>Comanies List</h2></p></Col>
                    <Col><CompanyModel/></Col>
                </Row>
                <ListGroup>
                    <TransitionGroup className = "companies-list">
                        <Table dark bordered>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>Address</td>
                                    <td>Website</td>
                                    {this.props.isAuthenticated ?
                                        <td>Delete</td> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>

                        {companies.map(({ _id, name, description, website, address }) => (
                            <CSSTransition key={_id} timeout = {500} classNames = "fade">
                                    <tr>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td>{address}</td>
                                    <td><Button
                                        className="success-btn"
                                        color="success"
                                        size="sm"
                                        onClick = {() => {
                                            window.open(website, "_blank");
                                        }}
                                    >
                                        See More
                                    </Button></td>

                                        {
                                            this.props.isAuthenticated ?
                                                <td>
                                                    <Button
                                                        className="success-btn"
                                                        color="danger"
                                                        size="sm"
                                                        onClick = {
                                                            this.onDeleteClick.bind(this, _id)
                                                            /*with .bind() we can pass the id of the company too delete*/
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </td> : null

                                        }

                                    </tr>
                            </CSSTransition>
                        ))}
                            </tbody>
                        </Table>
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}



const mapStateToProps = (state) => ({
    company: state.company,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getCompanies, deleteCompany }
    )(CompaniesList);