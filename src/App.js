import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addUserData } from './store/actions/userActions'
import LoginPage from './components/container/LoginPage/LoginPage'
import Menu from './components/container/Menu/Menu'
import MainPage from './components/container/MainPage/MainPage'
import AddWeightMeasurement from './components/container/AddWeightMeasurement/AddWeightMeasurement';
import Profile from './components/container/Profile/Profile'
import SignUp from './components/container/SignUp/SignUp'
import MeasurementsResults from './components/container/MeasurementsResults/MeasurementsResults';
import AddBodySizeMeasurement from './components/container/AddBodySizeMeasurement/AddBodySizeMeasurement';

class App extends Component {


  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      let that = this;
      //Perform some operation here
      let users = this.props.users
      Object.keys(users).forEach(key => {
        // console.log(users[key].userID === this.props.userAuth)
        if (users[key].userID === this.props.userAuth) {
          return;
        } else {
          that.props.addUserData({})
        }
      });
    }
  }
  render() {
    const { isEmpty } = this.props;

    return (
      <HashRouter basename='/'>
        <div style={isEmpty ? { paddingTop: '0' } : { paddingTop: '8vh' }}>
          <Route exact path="/login" render={() => (isEmpty ? <LoginPage /> : <Redirect to='/' />)} />
          <Route exact path='/signup' render={() => (isEmpty ? <SignUp /> : <Redirect to='/' />)} />
          <Route path="/" render={() => (
            !isEmpty ?
              <Menu /> : <Redirect to='/login' />)} />
          <Route exact path='/' render={() => (!isEmpty ? <MainPage /> : <Redirect to='/login' />)} />
          <Switch>
            <Route exact path='/measurement/add' render={() => (!isEmpty ? <AddWeightMeasurement /> : <Redirect to='/login' />)} />
            <Route exact path='/measurement/results' render={() => (!isEmpty ? <MeasurementsResults /> : <Redirect to='/login' />)} />
            <Route exact path='/measurement/add-body-size' render={() => (!isEmpty ? <AddBodySizeMeasurement /> : <Redirect to='/login' />)} />
          </Switch>
          <Route exact path='/profile' render={() => (!isEmpty ? <Profile /> : <Redirect to='/login' />)} />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    isEmpty: state.firebase.auth.isEmpty,
    userAuth: state.firebase.auth.uid,
    users: state.firestore.data.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserData: (user) => dispatch(addUserData(user)),
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' }
  ])
)(App)

