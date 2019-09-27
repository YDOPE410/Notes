import React from 'react';
import {Redirect} from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {

            if (!localStorage.getItem('userToken')) {
                this.setState({ redirect: true })
                return;
            }
            fetch('http://localhost:3001/check-token', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({'token': localStorage.getItem('userToken')})
            }).then(res => {
                
                if (res.status === 200) {
                    this.setState({ loading: false });
                } else {
                    this.setState({ redirect: true, loading: false });
                }
            })
        }


        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}