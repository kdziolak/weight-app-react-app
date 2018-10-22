import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage'
import Menu from './components/container/Menu'
import MainPage from './components/container/MainPage'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import AddWeightMeasurement from './components/container/AddWeightMeasurement';
import Profile from './components/container/Profile'
import SignUp from './components/container/SignUp'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    const {isEmpty} = this.props;
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
          <Route exact path="/login" render={() => (isEmpty ? <LoginPage loggedInChanged={this.loggedInChanged}/> : <Redirect to='/'/>)}/>
          <Route path="/" render={() => (
              !isEmpty ?
              <Menu /> : <Redirect to='/login'/>)} />
          <Route exact path='/signup' component={SignUp} />
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

const mapStateToProps = (state) => {
  return{
      isEmpty: state.firebase.auth.isEmpty,
  }
}


export default connect(mapStateToProps)(App);
