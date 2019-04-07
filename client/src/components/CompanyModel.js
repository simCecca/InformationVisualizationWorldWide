import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Label,
    Form,
    FormGroup,
    Card,
    CardTitle,
    CardText
} from 'reactstrap';

//container: component that is hooked to redux => redux state inside a react component
import { connect } from 'react-redux';
import { addCompany } from '../actions/companyActions';
import PropTypes from 'prop-types';
//for find the lat-long about an address via leaflet
import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();

class CompanyModel extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,//represent if the model is open or not
            haveAllOfTheIteams: false
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    formSubmitted = async (event) => {
        event.preventDefault();//stops the default action of an element from happening
        const results = await provider.search({ query: this.state.newCompany.address });//for searching the lat and long of this address

        if(results.length > 0) {
            console.log(results);
            const newCompany = {
                name: this.state.newCompany.name,
                description: this.state.newCompany.description,
                website: this.state.newCompany.website,
                address: this.state.newCompany.address,
                lat: results[0].y,
                lng: results[0].x
            };

            //add company via addCompany action
            this.props.addCompany(newCompany);

            //close model
            this.toggle();
        }
        else alert("Address not find");
    };

    valueChanged = (event) =>{
        const {name, value} = event.target;
        this.setState((prevState) => ({
            newCompany: {
                ...prevState.newCompany,//for don't override the value inserted in the <Input> before this
                [name]: value
            }
        }));
        this.setState({haveAllOfTheIteams: this.enableSubmitButton() })
    };

    enableSubmitButton(){
        return (
            this.state.newCompany !== undefined &&
            this.state.newCompany.name !== undefined &&
            this.state.newCompany.description !== undefined &&
            this.state.newCompany.website !== undefined &&
            this.state.newCompany.address !== undefined
        );
    }

    render(){

        return (
            <div className = "company-model">
                {this.props.isAuthenticated ?
                    <Button
                        color="dark"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                    >
                        Add a Company
                    </Button> : <h4 className="mb-3 ml-4">Please log in to add and modify Companies</h4>
                }
                <Modal
                    isOpen = { this.state.modal }
                    toggle = { this.toggle }
                >
                    <ModalHeader toggle = { this.toggle }>
                        Add the company to the Information Visualization World Wide
                    </ModalHeader>
                    <ModalBody>
                        <Card body className="message-form">
                            <CardTitle>Insert the company</CardTitle>
                            <Form onSubmit={this.formSubmitted}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input onChange={this.valueChanged} type="text" name="name" id="name"
                                           placeholder="Enter the company name"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input onChange={this.valueChanged} type="textarea" name="description" id="description"
                                           placeholder="Enter a description of the company"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="website">Website</Label>
                                    <Input onChange={this.valueChanged} type="text" name="website" id="website"
                                           placeholder="Enter the website URL of the company"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input onChange={this.valueChanged} type="text" name="address" id="address"
                                           placeholder="enter the address of the company"/>
                                </FormGroup>
                                <Button type='submit' color="info" disabled={!this.state.haveAllOfTheIteams}>Add Company</Button>
                            </Form>
                        </Card>
                    </ModalBody>
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    company: state.company,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addCompany })(CompanyModel);