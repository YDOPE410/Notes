import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';



class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: ""
        }

    }
    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    loginAct = () => {
        if (this.state.repeatPassword === this.state.password && this.state.email !== '') {
            fetch("http://localhost:8080/login")
                .then(res => {
                    if (res.status === 200) {
                        console.log('good');
                    }
                    else {
                        
                    }
                })
        }
        else {
            console.log("The passwords are different! Or email is empty")
        }
    }


    render() {
        return (
            <div className='registrationForm'>
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
                <input
                    name='repeatPassword'
                    type='password'
                    placeholder='Password'
                    onChange={this.handleChangeInput}
                />
                <br />
                <input onClick={this.loginAct} type='submit' value='Sign in' />
                <br />
                <Link to='/' > Back to login </Link>
            </div>
        )
    }
}

export default RegistrationForm