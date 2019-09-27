import React from 'react';
import LoginForm from './LoginForm'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import NotesContainer from './NotesContainer';
import '../styles/App.css';
import withAuth from './withAuth';
import checkToken from './checkToken';




export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch >
          <Route exact path='/user/notes' component={withAuth(NotesContainer)} />
          <Route exact path='/registration' component={checkToken(RegistrationForm)} />
          <Route component={checkToken(LoginForm)} />
        </Switch>
      </BrowserRouter>
    )
  }
}
