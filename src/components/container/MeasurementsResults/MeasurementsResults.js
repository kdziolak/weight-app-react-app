import React, { Component } from 'react'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import { connect } from 'react-redux'
import {fetchDataFromDatabase} from '../../../store/actions/weightActions'

class MeasurementsResults extends Component {
  componentDidMount() {
    this.props.fetchDataFromDatabase()
  }
  render(){
    return(
      <div className='component-padding'>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <HeaderTitle headerNumber={3} content='Your progress!' classes='blue-text text-darken-1'/>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <table className='highlight'>
                <thead>
                  <tr>
                      <th>Measurement date: </th>
                      <th>Kind of measurement:</th>
                      <th>Measurement value:</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchDataFromDatabase: () => dispatch(fetchDataFromDatabase())
  }
}

export default connect(null, mapDispatchToProp)(MeasurementsResults);
