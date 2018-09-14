import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

class App extends Component {
  state={
    loggedIn: false
  }
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route exact path='/' render={ () => (
                !this.state.loggedIn ? (
                  <Redirect to="/login" />
                ) : (
                  <div className='container'>Zalogowano</div>
                )
              )
            } />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
