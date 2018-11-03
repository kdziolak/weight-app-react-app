import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import { connect } from 'react-redux'
import moment from 'moment'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle'
import Paragraph from '../../presentational/Paragraph/Paragraph'
import InputField from '../../presentational/InputField/InputField'
import Button from '../../presentational/Button/Button'
import {newWeightMeasurement} from '../../../store/actions/weightActions'
import M from 'materialize-css'


class AddWeightMeasurement extends Component {
    state = {
        inputValues: {
            weight: '',
            date: '',
        },
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
                    let datapickerOptions = {
                        format: 'dd.mm.yyyy',
                        onSelect: (date) => {
                            console.log(moment(date).format('DD.M.YYYY'))
                            // this.setState({ 
                            //     inputValues: {
                            //         ...this.state.inputValues,
                            //         date
                            //     }
                            // })
                        }
                    }

                    M.Datepicker.init(e.target, datapickerOptions)
                }
            }
        ],
        previousWeightValue: 50,
        lastWeightMesurementDate: '21.09.2018'
    }

    onSubmitHandle = e => {
        let {weight, date} = this.state.inputValues
        e.preventDefault()
        if(weight && date) this.props.newWeightMeasurement(this.state.inputValues)
    }

    handleOnChange = (e) => {
        if(e.target.id === 'new-weight-input'){
            this.setState({
                inputValues: {
                    ...this.state.inputValues,
                    weight: e.target.value
                }
            })
        }
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
                <form onSubmit={this.onSubmitHandle}>
                    {
                        this.state.inputsArray.map((input, i) => {
                            return <InputField getDatepicker={input.getDatepicker ? input.getDatepicker : null} changeValue={this.handleOnChange} key={i} type={input.type} id={input.id} classes={input.classes} label={input.label}/>;
                        })
                    }
                    <Button classes='btn btn-large blue waves-effect' content='Add weight mesurement'/>
                </form>
            </div>
        </div>
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
    return {
        newWeightMeasurement: (data) => dispatch(newWeightMeasurement(data))
    }
}

export default connect(null, mapDispatchToProps)(AddWeightMeasurement); 