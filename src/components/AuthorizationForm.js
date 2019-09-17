import React from 'react';
import Avatar from './Avatar'

class AuthorizationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            defaultValueEmail: "Email",
            defaultValuePass: "Password",
            hidePass: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }


    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePass(event) {
        this.setState({hidePass:true, password: event.target.value });
    }

    render() {
        return (
            <>
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
                </form>
            </>
        )
    }
}

export default AuthorizationForm