import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

//container: component that is hooked to redux => redux state inside a react component
import { connect } from 'react-redux';
import PropTypes from 'prop-types';//typechecking on the props for a component
/*As your app grows, you can catch a lot of bugs with typechecking. For some applications,
 you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application.
 But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking
  on the props for a component, you can assign the special propTypes property*/
import { register } from '../../actions/authActions'
//for find the lat-long about an address via leaflet
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {REGISTER_FAIL} from "../../actions/types";
import { clearErrors } from '../../actions/errorActions';
const provider = new OpenStreetMapProvider();

class RegisterModel extends Component{
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {//typechecking on the props for a component
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props; //we can use props for errors because at the end of this file we wrote: error: state.error
        if(error !== prevProps.error) {//if the error state is changed
            //check for register error
            if(error.id === REGISTER_FAIL){
                this.setState({ msg: error.msg.msg });
            }else
                this.setState({ msg: null });
        }


        //close the modal
        //if authenticated, close modal
        if(this.state.modal){//if the modal is open
            if(isAuthenticated){//if you are authenticated
                this.toggle();
            }
        }
    }


    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state; //get from the form

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        this.props.register(newUser);//attempt to register
        //  I wont to display the error in the model so I don't close the modal ere
    };

    render(){

        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModel);