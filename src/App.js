import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import Menu from './components/container/Menu'
import MainPage from './components/container/MainPage'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import AddWeightMeasurement from './components/container/AddWeightMeasurement';
import Profile from './components/container/Profile'

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
          {/* {
            this.state.loggedIn ? <Redirect to='/login'/> : <Redirect to='/'/>
          } */}
          {/* {
            !this.state.loggedIn ? <Route path="/" render={() => (
              log
              (<Menu loggedInChanged={this.loggedInChanged}/>)
            )} />  : <Route exact path="/login" render={() => (<LoginPage loggedInChanged={this.loggedInChanged}/>)}/>
          }  */}
          <Route exact path="/login" render={() => (this.state.loggedIn ? <LoginPage loggedInChanged={this.loggedInChanged}/> : <Redirect to='/'/>)}/>
          <Route path="/" render={() => (
              !this.state.loggedIn ?
              <Menu loggedInChanged={this.loggedInChanged}/> : <Redirect to='/login'/>)} /> 
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/measurement/add' component={AddWeightMeasurement} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
