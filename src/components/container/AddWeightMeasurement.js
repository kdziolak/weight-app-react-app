import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import HeaderTitle from '../presentational/HeaderTitle'
import Paragraph from '../presentational/Paragraph'
import InputField from '../presentational/InputField'
import Button from '../presentational/Button'
import M from 'materialize-css'


class AddWeightMeasurement extends Component {
    state = {
        inputsArray: [
            {
                type: 'number',
                id: 'new-weight-input',
                label: 'Add new weight',
                classes: 'blue-text text-darken-3'
            },
            {
                type: 'text',
                id: 'date-input',
                label: 'Date',
                classes: 'blue-text text-darken-3',
                getDatepicker: (e) => {
                    M.Datepicker.init(e.target)
                }
            }
        ],
        previousWeightValue: 50,
        lastWeightMesurementDate: '21.09.2018'
    }


  render() {
      
    return (
      <div className='add-weight-measurement container'>
        <div className="row">
            <div className="col s12 center-align">
                <HeaderTitle headerNumber={3} content='Add new weight' classes='blue-text text-darken-1'/>
            </div>
        </div>
        <div className="row">
            <div className="col s12 center-align">
                <Paragraph classes='flow-text' content={`Your last weight measurement showed at ${this.state.previousWeightValue} kg and has been added ${this.state.lastWeightMesurementDate}`}/>
            </div>
        </div>
        <div className="row center-align">
            <div className="col s12">
                <form onSubmit={e => {e.preventDefault()}}>
                    {
                        this.state.inputsArray.map((input, i) => {
                            return <InputField getDatepicker={input.getDatepicker ? input.getDatepicker : null} key={i} type={input.type} id={input.id} classes={input.classes} label={input.label}/>;
                        })
                    }
                    <Button  classes='btn btn-large blue waves-effect' content='Add weight mesurement'/>
                </form>
            </div>
        </div>
      </div>
    )
  }
}

export default AddWeightMeasurement;