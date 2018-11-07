import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
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
            maxDate: new Date(),
            format: 'dd mmmm yyyy',
            i18n: {
                done: null
            },
            onSelect: (date) => {
                this.setState({ 
                    inputValues: {
                        ...this.state.inputValues,
                        date: moment(date).format('DD MMMM YYYY')
                    }
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
      let { measurementDate, weightValue } = this.props.measurement;
    return (
      <div className='add-weight-measurement container'>
        <div className="row">
            <div className="col s12 center-align">
                <HeaderTitle headerNumber={3} content='Add new weight' classes='blue-text text-darken-1'/>
            </div>
        </div>
        <div className="row">
            <div className="col s12 center-align">
                <Paragraph classes='flow-text' content={`Your last weight measurement showed at ${weightValue ? weightValue : ''} kg and has been added ${measurementDate ? measurementDate : ''}`}/>
            </div>
        </div>
        <div className="row center-align">
            <div className="col s12">
            <form onSubmit={this.onSubmitHandle}>
                    {
                        inputsArray.map((input, i) => {
                            return (<InputField minVal={input.min ? input.min : null} 
                            value={input.id === 'date-input' ? inputValues.date : inputValues.weight} 
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

const mapStateToProps = state => {
    let measurement = {}
    if(!isEmpty(state.firestore.ordered.measurements)){
        measurement = state.firestore.ordered.measurements[0]
    }
    return{
        userAuthID: state.firebase.auth.uid,
        usersID: state.firestore.ordered,
        measurement
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendDataToDatabase: (data) => dispatch(sendDataToDatabase(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if(isEmpty(props.usersID)){
            return [
                { collection: 'users'}
            ]
        }
        // props.usersID.users.forEach(user => console.log(user.userID))
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
)(AddWeightMeasurement)