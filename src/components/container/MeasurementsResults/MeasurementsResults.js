import React, { Component } from 'react'
import './MeasurementsResults.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux'
import {compose} from 'redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import {fetchDataFromDatabase} from '../../../store/actions/measurementActions'
import ResultsTable from '../../presentational/ResultsTable/ResultsTable'
import Preloader from '../../presentational/Preloader/Preloader';
import Pagination from '../../presentational/Pagination/Pagination'
import FilterCollapsible from '../../presentational/FilterCollapsible/FilterCollapsible'
import moment from 'moment'
import M from 'materialize-css'

class MeasurementsResults extends Component {

  
  state = {
    search: 'date',
    filterDates: {
      from: '',
      to: ''
    },
    filterValues: {
      from: '',
      to: ''
    },
    measurements: [],
    lastPerPage: 0,
    perPage: 8
  }
    
  onSelectHandle = (e) => {
    this.setState({
      search: e.target.value,
      filterDates: {
        from: '',
        to: ''
      },
      measurements: this.props.measurements
    })
   
  }


  onChangeHandle = e => {
    this.setState({
      measurements: this.props.measurements,
      filterValues: {
        ...this.state.filterValues,
        [e.target.dataset.key]: e.target.value
      }
    })
    if(e.target.value !== ''){
      this.filterDataTable(this.props.measurements, {
        ...this.state.filterValues,
        [e.target.dataset.key]: e.target.value
      }, 'weightValue')
    }
    
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
          that.filterDataTable(that.state.measurements, that.state.filterDates, 'measurementDate')
        }
    }
    M.Datepicker.init(e.target, datepickerOptions)
}

  filterDataTable = (measurements, filterDatas, option) => {
    let filterData = measurements.filter(measurement => ((measurement[option].toString() >= filterDatas.from && measurement[option].toString() <= filterDatas.to) || (measurement[option].toString() >= filterDatas.from && filterDatas.to === '')))
    if(!filterData.length) filterData = [{
      measurementDate:"",
      measurementType:"Not found",
      weightValue:""
    }]
    this.setState({
      measurements: filterData
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

  componentDidUpdate() {
    M.AutoInit()
  }

  render(){
    let measurements = this.state.measurements.length ? this.state.measurements : this.props.measurements
    const renderTableOrSpinner = this.props.measurements.length ? <ResultsTable measurements={measurements} perPage={this.state.perPage} lastPerPage={this.state.lastPerPage}/> : <div className='spinner-container'><Preloader/></div>

    return(
      <div className='measurements-results component-padding'>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <HeaderTitle headerNumber={3} content='Your progress!' classes='blue-text text-darken-1'/>
            </div>
          </div>
          <FilterCollapsible
            search={this.state.search} 
            onSelectHandle={this.onSelectHandle} 
            onChangeHandle={this.onChangeHandle} 
            showDatepicker={this.showDatepicker}
          />
         <div className='card-panel'>
         <div className="row table-height">
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
                   <ReactPaginate
                    pageCount={Math.ceil(this.props.measurements.length/8)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    containerClassName='pagination center-align'
                    pageClassName='waves-effect'
                    activeClassName='active'
                    onPageChange={(e)=>{
                      let pageNumber = e.selected + 1;
                      let perPage = 8 * pageNumber;
                      let lastPerPage = (8 * pageNumber) - 8;
                      
                      this.setState({
                        lastPerPage,
                        perPage
                      })
                    }}
                  />
              </div>
            }
           
            
          </div>
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