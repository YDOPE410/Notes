import React from 'react';
import LoginForm from './LoginForm'
import { Route, BrowserRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import NotesContainer from './NotesContainer'
import '../styles/App.css';




export default  class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path='/' component={LoginForm}/>
          <Route exact path='/user/notes' component={NotesContainer}/>
          <Route exact path='/registration' component={RegistrationForm}/>
      </BrowserRouter>
    )
  }
}
