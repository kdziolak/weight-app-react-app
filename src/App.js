import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import fire from './firebase'
import history from './history'

class App extends Component {
  state={
    loggedIn: false
  }

  loggedInChanged = () => {
    let loggedIn = true;
    this.setState({
      loggedIn
    })
  }

  handleClick = () => {
    fire.auth().signOut()
      .then(()=> {
        let loggedIn = false;
        this.setState({
          loggedIn
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  render() {
    return (
      <HashRouter>
        <div>
          {
            this.state.loggedIn ? <Redirect to='/' /> : <Redirect to='/login'/>
          }
          <Switch>
            <Route exact path="/" render={()=>(<button className='btn blue darken-3' onClick={this.handleClick}>Sign out</button>)} />
            <Route exact path="/login" render={() => (<LoginPage loggedInChanged={this.loggedInChanged}/>)}/>
          </Switch>
          
        </div>
      </HashRouter>
    );
  }
}

export default App;
