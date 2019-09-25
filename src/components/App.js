import React from 'react';
import LoginForm from './LoginForm'
import '../styles/App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';



export default  class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path='/' component={LoginForm}/>
          <Route exact path='/registration' component={RegistrationForm}/>
      </BrowserRouter>
    )
  }
}
