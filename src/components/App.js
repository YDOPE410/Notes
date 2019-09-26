import React from 'react';
import LoginForm from './LoginForm'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import NotesContainer from './NotesContainer'
import '../styles/App.css';




export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch >
          <Route exact path='/user/notes' component={NotesContainer} />
          <Route exact path='/registration' component={RegistrationForm} />
          <Route component={LoginForm} />
        </Switch>
      </BrowserRouter>
    )
  }
}
