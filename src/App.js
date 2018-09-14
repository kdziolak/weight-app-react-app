import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import history from './history'

class App extends Component {
  state={
    loggedIn: false
  }

  loggedInChanged = (value) => {
    this.setState({
      loggedIn:true
    })
  }

  render() {
    return (
      <HashRouter>
        <div>
          {
            !this.state.loggedIn ? <Redirect to='/login'/> : null
          }
          <Switch>
            <Route exact path="/" render={()=>(<p>Zalogowano</p>)} />
            <Route exact path="/login" component={LoginPage}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
