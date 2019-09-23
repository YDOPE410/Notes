import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';



class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: ''
        }

    }
    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    registrationAction = () => {
        if (this.state.repeatPassword === this.state.password && this.state.email !== '') {
            
            fetch(`http://localhost:8080/email-exists?email=${this.state.email}`).then(res => {
                if (res.status === 200) {
                    fetch('http://localhost:8080/registration', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then(res => {
                            console.log("almost reg")
                            
                        })
                }
                else {
                    alert('email is exists');
                }
            });
        

           

            
        }
        else {
            console.log('The passwords are different! Or email is empty')
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
                    placeholder='Repeat password'
                    onChange={this.handleChangeInput}
                />
                <br />
                <input onClick={this.registrationAction} type='submit' value='Sign in' />
                <br />
                <Link to='/' > Back to login </Link>
            </div>
        )
    }
}

export default RegistrationForm