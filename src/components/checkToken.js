import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {

                redirect: false,
                redirectPath: '/user/notes'
            };
        }

        componentDidMount() {
            if (localStorage.getItem('userToken')) {
                this.setState({ redirect: true })
            } else {
                this.setState({redirectPath : '/'})
            }

        }


        render() {
            const { redirect, redirectPath } = this.state;
            if (redirect) {
                return <Redirect to={redirectPath} />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}