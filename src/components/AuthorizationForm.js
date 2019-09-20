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

    render() {
        return (
            <div className='authorizationForm'>
                <Avatar />
                <form>
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
                    <input type='submit' value='Sign in' />
                    <br />
                    <Link to='/registration' > Registration </Link>
                </form>
            </div>
        )
    }
}

export default AuthorizationForm