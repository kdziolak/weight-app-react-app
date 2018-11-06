import React, { Component } from 'react';
import LoginPage from './components/container/LoginPage/LoginPage'
import Menu from './components/container/Menu/Menu'
import MainPage from './components/container/MainPage/MainPage'
import { HashRouter, Route, Redirect} from 'react-router-dom'
import AddWeightMeasurement from './components/container/AddWeightMeasurement/AddWeightMeasurement';
import Profile from './components/container/Profile/Profile'
import SignUp from './components/container/SignUp/SignUp'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    const {isEmpty} = this.props;

    return (
      <HashRouter basename='/'>
        <div>
          <Route exact path="/login" render={() => (isEmpty ? <LoginPage/> : <Redirect to='/'/>)}/>
          <Route exact path='/signup' render={() => (isEmpty ? <SignUp/> : <Redirect to='/'/>)} />
          <Route path="/" render={() => (
              !isEmpty ?
              <Menu /> : <Redirect to='/login'/>)} />
          <Route exact path='/' render={() => (!isEmpty ? <MainPage/> : <Redirect to='/login'/>)} />
          <Route exact path='/measurement/add' render={() => (!isEmpty ? <AddWeightMeasurement/> : <Redirect to='/login'/>)}/>
          <Route exact path='/profile' render={() => (!isEmpty ? <Profile/> : <Redirect to='/login'/>)} />
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
