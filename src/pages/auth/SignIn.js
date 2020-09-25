import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, Input, CustomInput } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            rememberMe: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { auth } = this.props

        if (auth.uid) {
            return <Redirect to='/' />
        } else {
            return (
                <Row className='d-flex justify-content-center align-items-center' >
                    <Col xs='10' lg='8' className='text-center'>
                        <h1>Sign In</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="type your e-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="type your password" />
                            </FormGroup>
                            <FormGroup>
                                <CustomInput checked={this.state.rememberMe} onChange={(event) => this.setState({
                                    [event.target.id]: !this.state.rememberMe
                                })} type="checkbox" id="rememberMe" label="Remember me" />
                            </FormGroup>
                            <FormGroup className='col-12 col-md-8 d-flex justify-content-center mx-auto'>
                                <Button onClick={this.handleSubmit} className='btn-warning w-75'>Sign In</Button>
                            </FormGroup>
                            <Row className='py-1'>
                                <Col className='small mx-auto' xs='12' md='6'>
                                    <p className='mb-1'>Forgot your password? <Link to='/sign-in/recover-password' className='basicLink'>Click here</Link></p>
                                    <p color='#1688b9' disabled>Need an account? <Link to='/sign-up' className='basicLink'>Sign Up</Link></p>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
