import React from 'react';
import "../styles/registration.css";
import { Link } from 'react-router-dom';
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    registrationAction = (event) => {
        if (this.state.email.match(emailRegExp) && this.state.password === this.state.repeatPassword && this.state.password.length > 7) {
            this.setState({ error: '' });
            fetch('http://localhost:3001/email-exist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: this.state.email })
            }).then(res => res.json()).then(res => {
                if (!res.exists) {
                    fetch('http://localhost:3001/register', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email: this.state.email, password: this.state.password })
                    }).then(res => {
                        this.props.history.push('/');
                    })
                } else {
                    this.setState({ error: 'Email exist' });
                }
            })

        } else {
            this.setState({ error: `(fields empty, password short or repeat different)` });
        }
    }


    render() {
        return (
            <div className='registration form'>
                <div
                    className='registration form-wrap'
                >
                    <span className='registration form-title'>Registration</span>
                    <br />
                    <input
                        className='registration form-input'
                        name='email'
                        type='text'
                        placeholder='Email'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='registration form-input'
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='registration form-input'
                        name='repeatPassword'
                        type='password'
                        placeholder='Repeat password'
                        onChange={this.handleChangeInput}
                    />
                    <br />
                    <input
                        className='registration form-submit'
                        onClick={this.registrationAction}
                        type='submit'
                        value='Sign up' />
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