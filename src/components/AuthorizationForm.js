import React from 'react';
import Avatar from './Avatar';

import { Link } from 'react-router-dom';

class AuthorizationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }

    }

    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    loginAction = () => {
        if (this.state.email !== '' && this.state.password !== '') {
            fetch(`http://localhost:8080/email-exists?email=${this.state.email}`).then(res => {
                if (res.status === 400) {
                    fetch('http://localhost:8080/login', {
                        method: "POST",
                        headers: {
                            body: JSON.stringify({ email: this.state.email, password: this.state.password })
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            alert('Successful login');
                            this.props.history.push('/user/notes');
                        }
                        return res.text();
                    }).then(res => alert(res));
                }
                else {
                    alert('Email not exist');
                }
            })
        }
        else {
            alert('Field is empty');
        }
    }

    render() {
        return (
            <div className='authorizationForm'>
                <Avatar />
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    onChange={this.handleChangeInput}
                />
                <br />
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    onChange={this.handleChangeInput}
                />
                <br />
                <input onClick={this.loginAction} type='submit' value='Sign in' />
                <br />
                <Link to='/registration' > Registration </Link>
            </div>
        )
    }
}

export default AuthorizationForm