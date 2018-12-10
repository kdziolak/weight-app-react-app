import React, { Component } from 'react'
import './MeasurementsResults.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { deleteMeasurementFromDB, changeRedirectState, filterMeasurementsByDate, resetFilter } from '../../../store/actions/measurementActions'
import ResultsTable from '../../presentational/ResultsTable/ResultsTable'
import Preloader from '../../presentational/Preloader/Preloader';
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
    preloader: false,
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
    if (e.target.value !== '') {
      this.filterDataTable(this.props.measurements, {
        ...this.state.filterValues,
        [e.target.dataset.key]: e.target.value
      }, 'weightValue')
    }

  }

  handleClick = e => {
    let measurement = this.props.measurements.find(el => el.id === e.target.parentNode.dataset.key)
    this.props.deleteMeasurementFromDB(measurement)
    if (this.state.filterDates.from) {
      this.props.filterMeasurementsByDate(this.state.filterDates)
    }
  }

  showDatepicker = (e) => {
    let target = e.target;
    let that = this;
    let datepickerOptions = {

      onOpen: function () {
        if (that.state.filterDates.from === '') {
          this.isOpen = false;
        }
        this.doneBtn.remove()
      },
      autoClose: true,
      defaultDate: new Date(),
      minDate: that.state.filterDates.from && target.id === 'to-date-input' ? new Date(that.state.filterDates.from) : null,
      maxDate: new Date(),
      format: 'dd mmmm yyyy',
      onSelect: function (date) {
        that.props.resetFilter();
        if (target.id === 'from-date-input') {
          let dates = { from: date, to: new Date() }
          that.setState({
            filterDates: dates,
            preloader: true
          })
          that.props.filterMeasurementsByDate(dates)
        }
        // if (target.id === 'to-date-input' && that.state.filterDates.from !== '') {
        //   let dates = { from: that.state.filterDates.from, to: date }
        //   that.setState({
        //     filterDates: dates,
        //     preloader: true
        //   })
        //   that.props.filterMeasurementsByDate(dates)
        // } else {
        //   return M.toast({ html: 'brak poczatkowej daty', classes: 'red' })
        // }
      }
    }
    M.Datepicker.init(e.target, datepickerOptions)
  }
  // filterDataTable = (measurements, filterDatas, option) => {
  //   // let filterData = measurements.filter(measurement => ((measurement[option].toString() >= filterDatas.from && measurement[option].toString() <= filterDatas.to) || (measurement[option].toString() >= filterDatas.from && filterDatas.to === '')))
  //   // if (!filterData.length) filterData = [{
  //   //   measurementDate: "",
  //   //   measurementType: "Not found",
  //   //   weightValue: ""
  //   // }]
  //   this.setState({
  //     measurements: this.props.filterMeasurements
  //   })
  // }

  componentDidMount() {
    this.props.changeRedirectState()
    M.AutoInit();
  }

  componentWillUnmount() {
    this.props.resetFilter()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterMeasurements !== this.props.filterMeasurements) {
      this.setState({
        preloader: false
      })
    }
    M.AutoInit()
  }

  render() {
    let measurements = this.props.filterMeasurements.length ? this.props.measurements.filter(el => {
      let date = false;
      this.props.filterMeasurements.forEach(filterMeasurement => {
        if (el.measurementDate === filterMeasurement.measurementDate) {
          date = true;
        }
      })
      return date;
    }) : this.props.measurements
    if (!this.props.filterMeasurements.length && this.state.filterDates.from) measurements = [{ measurementDate: '', measurementType: 'not found', weightValue: '' }]
    let renderTableOrSpinner = (measurements.length && !this.state.preloader) ? (
      <div className='table-height'>
        <ResultsTable
          measurements={measurements}
          perPage={this.state.perPage}
          lastPerPage={this.state.lastPerPage}
          handleClick={this.handleClick}
        />
      </div>
    )
      : (
        <div className='spinner-container'>
          <Preloader />
        </div>
      )
    return (
      <div className='measurements-results component-padding'>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <HeaderTitle headerNumber={3} content='Your progress!' classes='blue-text text-darken-1' />
            </div>
          </div>
          <FilterCollapsible
            search={this.state.search}
            onSelectHandle={this.onSelectHandle}
            onChangeHandle={this.onChangeHandle}
            showDatepicker={this.showDatepicker}
          />
          <div className='card-panel'>
            <div className="row">
              {
                this.props.fetchError ?
                  <div className="col s12 center-align">
                    <p className='flow-text red white-text z-depth-2'>Sorry. You don't have any activities.</p>
                  </div>
                  :
                  <div className="col s12 center-align table-flex">
                    {
                      renderTableOrSpinner
                    }

                    <ReactPaginate
                      pageCount={Math.ceil(this.props.measurements.length / 8)}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      containerClassName='pagination center-align hide-on-med-and-down'
                      pageClassName='waves-effect'
                      activeClassName='active'
                      onPageChange={(e) => {
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
  if (!isEmpty(state.firestore.ordered.measurements)) {
    measurements = state.firestore.ordered.measurements
  }
  return {
    fetchError: state.measurement.error,
    userAuthID: state.firebase.auth.uid,
    usersID: state.firestore.ordered,
    measurements,
    filterMeasurements: state.measurement.measurementsData !== undefined ? state.measurement.measurementsData : []
  }
}

const mapDispatchToProp = dispatch => {
  return {
    deleteMeasurementFromDB: (elemToRemove) => dispatch(deleteMeasurementFromDB(elemToRemove)),
    changeRedirectState: () => dispatch(changeRedirectState()),
    filterMeasurementsByDate: dates => dispatch(filterMeasurementsByDate(dates)),
    resetFilter: () => dispatch(resetFilter())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProp),
  firestoreConnect((props) => {
    if (isEmpty(props.usersID)) {
      return [
        { collection: 'users' }
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