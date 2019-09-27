import React from 'react';
import '../styles/header.css';
import Avatar from './Avatar';
import { withRouter } from "react-router";


class Header extends React.Component {
    constructor(props) {
        super(props)
    }


    logoutAction = (event) => {
        localStorage.removeItem('userToken');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='header'>

                <div
                    className='user flex-item'
                >
                    <Avatar />
                    <span
                        className='user-name'
                    >
                        El Ricko
                    </span>
                </div>

                <div
                    className='navbar flex-item'
                >
                    <ul className='menu'>
                        <li>
                            Add note
                        </li>
                        <li>
                            Help
                            <ul className='submenu'>
                                <li>Add new note: ctrl+alt+n or click 'Add note' at bar</li>
                                <li>Open note: double click on note</li>
                                <li>Close note: click CLOSE on opened note</li>
                                <li>Remove note: click X on minimized note</li>
                                <li>You can drag and drop your note</li>
                            </ul>
                        </li>

                    </ul>
                </div>

                <div
                    className='exit flex-item'
                >
                    <input type='button' value='Logout' onClick={this.logoutAction} />
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
