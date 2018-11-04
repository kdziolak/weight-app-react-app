import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import { connect } from 'react-redux'
import moment from 'moment'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle'
import Paragraph from '../../presentational/Paragraph/Paragraph'
import InputField from '../../presentational/InputField/InputField'
import Button from '../../presentational/Button/Button'
import {sendDataToDatabase} from '../../../store/actions/weightActions'
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
                min: 1,
                classes: 'blue-text text-darken-3'
            },
            {
                type: 'text',
                id: 'date-input',
                label: 'Date',
                classes: 'datepicker blue-text text-darken-3',
                // showDatepicker: (e) => {
                //     let datapickerOptions = {
                //         format: 'dd.mm.yyyy',
                //         onSelect: (date) => {
                //             this.setState({ 
                //                 inputValues: {
                //                     ...this.state.inputValues,
                //                     date: moment(date).format('DD.M.YYYY')
                //                 },
                //                 message: ''
                //             })
                //         }
                //     }
                //     M.Datepicker.init(e.target, datapickerOptions)
                // }
            }
        ],
        message: '',
        previousWeightValue: 50,
        lastWeightMesurementDate: '21.09.2018'
    }

    showDatepicker = (e) => {
        let datepickerOptions = {
            onOpen: function() {
                this.doneBtn.remove()
            },
            autoClose: true,
            defaultDate: new Date(),
            format: 'dd mmmm yyyy',
            i18n: {
                done: null
            },
            onSelect: (date) => {
                this.setState({ 
                    inputValues: {
                        ...this.state.inputValues,
                        date: moment(date).format('DD MMMM YYYY')
                    },
                    message: ''
                })
            }
        }
        // console.log(datepickerOptions.i18n)
        M.Datepicker.init(e.target, datepickerOptions)
    }

    onSubmitHandle = e => {
        let {weight, date} = this.state.inputValues
        e.preventDefault()
        if(weight && date) {
            this.props.sendDataToDatabase(this.state.inputValues)
            this.setState({
                inputValues: {
                    weight: '',
                    date: ''
                },
                message: 'Ok wszyskto wysłane'
            })
            M.toast({html: `New weight have been added.`, classes: 'green'})
        } else {
            M.toast({html: `Incorrect data. Fill inputs field.`, classes: 'red'})
        }
    }

    handleOnChange = (e) => {
        if(e.target.id === 'new-weight-input'){
            this.setState({
                inputValues: {
                    ...this.state.inputValues,
                    weight: e.target.value,
                },
                message: ''
            })
        }
    }

  render() {
      let { inputsArray, inputValues } = this.state;
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
                        inputsArray.map((input, i) => {
                            return (<InputField minVal={input.min ? input.min : null} 
                            value={input.id == 'date-input' ? inputValues.date : inputValues.weight} 
                            showDatepicker={input.id === 'date-input' ? this.showDatepicker : null} 
                            changeValue={this.handleOnChange} key={i} type={input.type} id={input.id} 
                            classes={input.classes} 
                            label={input.label}/>
                        )
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
        sendDataToDatabase: (data) => dispatch(sendDataToDatabase(data))
    }
}

export default connect(null, mapDispatchToProps)(AddWeightMeasurement); 