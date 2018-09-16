import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import Menu from './components/container/Menu'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'

class App extends Component {
  state={
    loggedIn: false
  }

  loggedInChanged = (value) => {
    let loggedIn = value;
    this.setState({
      loggedIn
    })
  }

  render() {
    return (
      <HashRouter>
        <div>
          {
            !this.state.loggedIn ? <Redirect to='/' /> : <Redirect to='/login'/>
          }
          <Switch>
            <Route exact path="/" render={() => (
              (<Menu loggedInChanged={this.loggedInChanged}/>)
            )} />
            <Route exact path="/login" render={() => (<LoginPage loggedInChanged={this.loggedInChanged}/>)}/>
          </Switch>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;
