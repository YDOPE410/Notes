import React from 'react';
import Avatar from './Avatar'



class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: "",
            defaultValueEmail: "Email",
            defaultValuePass: "Password",
            defaultValueRepeatPass: "Repeat password",
            hidePass: false,
            hideRepeatPass: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeRepeatPass = this.handleChangeRepeatPass.bind(this);
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePass(event) {
        if (event.target.value.length == 0) {
            this.setState({ hidePass: false, password: event.target.value });
            return;
        }
        this.setState({ hidePass: true, password: event.target.value });
    }

    handleChangeRepeatPass(event) {
        if (event.target.value.length == 0) {
            this.setState({ hideRepeatPass: false, repeatPassword: event.target.value });
            return;
        }
        this.setState({ hideRepeatPass: true, repeatPassword: event.target.value });
    }

    render() {
        return (
            <div className='registrationForm'>
                <Avatar />
                <form>
                    <input
                        type='text'
                        defaultValue={this.state.defaultValueEmail}
                        onBlur={(e) => {
                            if (e.target.value.length == 0)
                                e.target.value = this.state.defaultValueEmail
                        }}
                        onFocus={(e) => {
                            if (e.target.value != this.state.email)
                                e.target.value = ""
                        }}
                        onChange={this.handleChangeEmail}
                    />
                    <br />
                    <input
                        type={this.state.hidePass ? 'password' : 'text'}
                        defaultValue={this.state.defaultValuePass}
                        onBlur={(e) => {
                            if (e.target.value.length == 0) {
                                e.target.value = this.state.defaultValuePass
                                this.state = { hidePass: false }
                            }
                        }}
                        onFocus={(e) => {
                            if (e.target.value != this.state.password) {
                                e.target.value = ""
                                this.state = { hidePass: true }
                            }
                        }}
                        onChange={this.handleChangePass}
                    />
                    <br />
                    <input
                        type={this.state.hideRepeatPass ? 'password' : 'text'}
                        defaultValue={this.state.defaultValueRepeatPass}
                        onBlur={(e) => {
                            if (e.target.value.length == 0) {
                                e.target.value = this.state.defaultValueRepeatPass
                                this.state = { hidePass: false }
                            }
                        }}
                        onFocus={(e) => {
                            if (e.target.value != this.state.repeatPassword) {
                                e.target.value = ""
                                this.state = { hideRepeatPass: true }
                            }
                        }}
                        onChange={this.handleChangeRepeatPass}
                    />
                    <br />
                    <input type='submit' value='Sign up' />


                </form>
            </div>

        )
    }
}

export default RegistrationForm