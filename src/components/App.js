import React from 'react';
import AuthorizationForm from './AuthorizationForm'
import '../styles/App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';



class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        
          <Route exact path='/' component={AuthorizationForm}/>
          <Route exact path='/registration' component={RegistrationForm}/>

      </BrowserRouter>
    )
  }
}

export default App;
