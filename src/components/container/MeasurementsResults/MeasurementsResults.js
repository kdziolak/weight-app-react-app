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
    search: 'date',
    filterDates: {
      from: '',
      to: ''
    },
    measurements: []
  }
    
  onSelectHandle = (e) => {
    this.setState({
      search: e.target.value,
      filterDates: {
        from: '',
        to: ''
      }
    })
  }

  showDatepicker = (e) => {
    let target = e.target;
    let that = this;
    let datepickerOptions = {
        onOpen: function() {
            this.doneBtn.remove()
        },
        autoClose: true,
        defaultDate: new Date(),
        minDate: that.state.filterDates.from && target.id==='to-date-input' ? new Date(that.state.filterDates.from) : null,
        maxDate: new Date(),
        format: 'dd mmmm yyyy', 
        onSelect: function(date) {
          that.setState({
            measurements: that.props.measurements
          })
          if(target.id === 'from-date-input'){
            that.setState({
              ...that.state,
              filterDates: {
                ...that.state.filterDates,
                from: moment(date).format('DD MMMM YYYY')
              }
            })
          } else if(target.id === 'to-date-input'){
            that.setState({
              filterDates: {
                ...that.state.filterDates,
                to: moment(date).format('DD MMMM YYYY')
              }
            })
          }
          that.filterDate()
        }
    }
    M.Datepicker.init(e.target, datepickerOptions)
}

  filterDate = () => {
    let filterDate = this.state.measurements.filter(measurement => ((measurement.measurementDate >= this.state.filterDates.from && measurement.measurementDate < this.state.filterDates.to) || (measurement.measurementDate >= this.state.filterDates.from && this.state.filterDates.to === '')))
    if(!filterDate.length) filterDate = [{
      measurementDate:"Not found",
      measurementType:"",
      weightValue:""
    }]
    this.setState({
      measurements: filterDate
    })
  }

  componentDidMount() {
    this.props.fetchDataFromDatabase()
    M.AutoInit();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      measurements: nextProps.measurements
    })
  }
  
  render(){
    let measurements = this.state.measurements.length ? this.state.measurements : this.props.measurements
    const renderTableOrSpinner = this.props.measurements.length ? <ResultsTable measurements={measurements}/> : <div className='spinner-container'><Preloader/></div>

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
                <div className="col s6">
                <InputField type='text' 
                  id='from-date-input' 
                  htmlFor='from-date-input' 
                  label='From' 
                  showDatepicker={this.showDatepicker} 
                  classes='datepicker blue-text text-darken-3'/>
                  </div>
                  <div className="col s6">
                <InputField type='text' 
                  id='to-date-input' 
                  htmlFor='to-date-input' 
                  label='To' 
                  showDatepicker={this.showDatepicker} 
                  classes='datepicker blue-text text-darken-3'/>
                  </div>
          </div>
                : null
          }
           
          
          <div className="row">
            {
              this.props.fetchError ? 
              <div className="col s12 center-align">
                  <p className='flow-text red white-text z-depth-2'>Sorry. You don't have any activities.</p>
              </div>
              : 
              <div className="col s12 center-align">
                  {
                    renderTableOrSpinner
                  }
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
    fetchDataFromDatabase: () => dispatch(fetchDataFromDatabase()),
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