import React from 'react';
import '../styles/login.css'
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }

    }

    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });


    render() {
        return (
            <div className='login form'>
                <div className='login form-wrap'>
                    <span className='login form-title'>Welcome</span>
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
                        className='login form-submit'
                        onClick={null}
                        type='submit'
                        value='Sign in'
                    />
                    <br />
                    <Link to='/registration' > Registration </Link>
                    <br />
                    <span >
                        {this.state.error}
                    </span>
                </div>
            </div>
        )
    }
}

