import React, { Component } from 'react'
import './MeasurementsResults.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import { connect } from 'react-redux'
import {compose} from 'redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import {fetchDataFromDatabase} from '../../../store/actions/measurementActions'
import ResultsTable from '../../presentational/ResultsTable/ResultsTable'
import Preloader from '../../presentational/Preloader/Preloader';
import Select from '../../presentational/Select/Select'
import InputField from '../../presentational/InputField/InputField'
import moment from 'moment'
import M from 'materialize-css'

class MeasurementsResults extends Component {
  state = {
    search: 'date'
  }

  onSelectHandle = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  showDatepicker = (e) => {
    let datepickerOptions = {
        onOpen: function() {
            this.doneBtn.remove()
        },
        autoClose: true,
        defaultDate: new Date(),
        maxDate: new Date(),
        format: 'dd mmmm yyyy', 
    }
    M.Datepicker.init(e.target, datepickerOptions)
}

  componentDidMount() {
    this.props.fetchDataFromDatabase()
    M.AutoInit();

  }
  componentDidUpdate() {
    M.AutoInit();
  }
  render(){
    const measurements = this.props.measurements.length ? <ResultsTable measurements={this.props.measurements}/> : <div className='spinner-container'><Preloader/></div>

    return(
      <div className='measurements-results component-padding'>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <HeaderTitle headerNumber={3} content='Your progress!' classes='blue-text text-darken-1'/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <Select onSelectHandle={this.onSelectHandle} />
            </div>
          </div>
          {
              this.state.search === 'date' ? 
              <div className="row">
                <div className="col s6 offset-s3">
                  <InputField type='text' showDatepicker={this.showDatepicker} classes='datepicker blue-text text-darken-3'/>
                </div>
              </div> : null
            }
          <div className="row">
            {
              this.props.fetchError ? 
              <div className="col s12 center-align">
                  <p className='flow-text red white-text z-depth-2'>Sorry. You don't have any activities.</p>
              </div>
              : 
              <div className="col s12 center-align">
                  {measurements}
              </div>
            }
           
          </div>
        </div>
      </div>
    )
     
  }
}

const mapStateToProps = state => {
  let measurements = {}
  if(!isEmpty(state.firestore.ordered.measurements)){
      measurements = state.firestore.ordered.measurements
  }
  return{
      fetchError: state.measurement.error,
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