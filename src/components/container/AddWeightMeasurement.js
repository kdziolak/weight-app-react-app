import React, { Component } from 'react'
import './AddWeightMeasurement.css'

export default class AddWeightMeasurement extends Component {
  render() {
    return (
      <div className='add-weight-measurement container'>
        <div className="row">
            <h3 className='center-align'>Add new weight</h3>
        </div>
        <div className="row center-align">
            <from className="col s12 ">
                <div className="input-field">
                    <input type="number" id='weight-input' className="weight-input"/>
                    <label for='weight-input'>Add new weight (kg)</label>
                </div>
                <div className="input-field">
                    <input type="text" id='date-input' className="datepicker"/>
                    <label for='date-input'>Day</label>
                </div>
            </from>
        </div>
      </div>
    )
  }
}
