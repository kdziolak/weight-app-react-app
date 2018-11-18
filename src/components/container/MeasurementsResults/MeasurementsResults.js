import React, { Component } from 'react'
import './MeasurementsResults.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import { connect } from 'react-redux'
import {compose} from 'redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import {fetchDataFromDatabase} from '../../../store/actions/measurementActions'
import ResultsTable from '../../presentational/ResultsTable/ResultsTable'
import Preloader from '../../presentational/Preloader/Preloader';

class MeasurementsResults extends Component {
  componentDidMount() {
    this.props.fetchDataFromDatabase()
  }
  render(){
    const measurements = this.props.measurements.length ? <ResultsTable measurements={this.props.measurements}/> : <div className='spinner-container'><Preloader/></div>

    return(
      <div className='.measurements-results component-padding'>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <HeaderTitle headerNumber={3} content='Your progress!' classes='blue-text text-darken-1'/>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center-align">
                {measurements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let measurements = {}
  if(!isEmpty(state.firestore.ordered.measurements)){
      measurements = state.firestore.ordered.measurements
  }
  return{
      userAuthID: state.firebase.auth.uid,
      usersID: state.firestore.ordered,
      measurements
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchDataFromDatabase: () => dispatch(fetchDataFromDatabase())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProp),
  firestoreConnect((props) => {
      if(isEmpty(props.usersID)){
          return [
              { collection: 'users'}
          ]
      }
      let [user] = props.usersID.users.filter(user => user.userID === props.userAuthID)
      return [
          { 
              collection: 'users',
              doc: user.id,
              subcollections: [
                  {
                      collection: 'measurements',
                      orderBy: ['measurementDate', 'desc']
                  }
              ],
              storeAs: 'measurements'
          }
      ]
  })
)(MeasurementsResults)