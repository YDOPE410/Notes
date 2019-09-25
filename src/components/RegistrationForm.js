import React from 'react';
import "../styles/registration.css";
import { Link } from 'react-router-dom';

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            error: ''           
        }
    }

    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className='registration form'>
                <div
                    className='registration form-wrap'
                >
                     <span className='registration form-title'>Registration</span>
                    <br />
                    <input
                        className='login form-input'
                        name='email'
                        type='text'
                        placeholder='Email'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='login form-input'
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='login form-input'
                        name='repeatPassword'
                        type='password'
                        placeholder='Repeat password'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='login form-submit'
                        onClick={null}
                        type='submit'
                        value='Sign in' />
                    <br />
                    <Link to='/' >Back to login</Link>
                    <br />
                    <span >
                        {this.state.error}
                    </span>
                </div>
            </div>
        )
    }
}