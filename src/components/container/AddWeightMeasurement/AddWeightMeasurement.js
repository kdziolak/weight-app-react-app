import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle'
import Paragraph from '../../presentational/Paragraph/Paragraph'
import Preloader from '../../presentational/Preloader/Preloader'
import InputField from '../../presentational/InputField/InputField'
import Button from '../../presentational/Button/Button'
import { sendDataToDatabase } from '../../../store/actions/measurementActions'
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
                max: 200,
                classes: 'blue-text text-darken-3'
            },
            {
                type: 'text',
                id: 'date-input',
                label: 'Date',
                classes: 'datepicker blue-text text-darken-3',
            }
        ],
        previousWeightValue: 50,
        lastWeightMesurementDate: '21.09.2018',
        spinner: false,
        componentIsReady: false
    }

    showDatepicker = (e) => {
        let datepickerOptions = {
            onOpen: function () {
                this.doneBtn.remove()
            },
            autoClose: true,
            defaultDate: new Date(),
            maxDate: new Date(),
            format: 'dd mmmm yyyy',
            i18n: {
                done: null
            },
            disableDayFn: (day) => {
                let dates = []
                if (isEmpty(this.props.measurements)) return false;
                this.props.measurements.forEach((measurement) => {
                    let date = new Date(measurement.measurementDate).toDateString()
                    dates = [...dates, date]
                })
                if (dates.indexOf(day.toDateString()) >= 0) {
                    return true;
                }
                return false;
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
        M.Datepicker.init(e.target, datepickerOptions)
    }



    onSubmitHandle = e => {
        console.log(e.keyCode)
        let { weight, date } = this.state.inputValues
        e.preventDefault()
        if (weight && date) {
            this.props.sendDataToDatabase(this.state.inputValues)
            this.setState({
                inputValues: {
                    weight: '',
                    date: ''
                },
                spinner: true
            })
            M.toast({ html: `New weight has been added.`, classes: 'green' })
        } else {
            M.toast({ html: `Incorrect data. Fill inputs field.`, classes: 'red' })
        }
    }

    handleOnChange = (e) => {
        if (e.target.value === '0') {
            M.toast({ html: `First number cannot be zero.`, classes: 'orange' })
            e.target.value = '';
        }
        if (e.target.id === 'new-weight-input') {
            this.setState({
                inputValues: {
                    ...this.state.inputValues,
                    weight: e.target.value,
                },
                message: ''
            })
        }
    }
    componentDidMount() {
        this.setState({
            componentIsReady: true
        })
    }

    render() {
        let { inputsArray, inputValues } = this.state;
        let lastMeasurement = this.props.measurements.length ? this.props.measurements[0] : {}
        let { measurementDate, weightValue } = lastMeasurement;

        if (this.state.spinner && !this.props.redirect)
            return (
                <div className='add-weight-measurement container add-weight-measurement-preloader'>
                    <div className="row">
                        <div className="col s12 center-align">
                            <Preloader />
                        </div>
                    </div>
                </div>
            )

        return (
            <div className='add-weight-measurement'>
                <div className='container'>
                    <div className="row">
                        <div className="col s12">
                            <HeaderTitle headerNumber={3} content='Add new weight' classes='blue-text text-darken-1' />
                        </div>
                    </div>
                    <div className='card-panel'>
                        <div className="row">
                            <div className="col s12 center-align">
                                <Paragraph classes='flow-text' content={`Your last weight measurement showed at ${weightValue ? weightValue : ''} kg and has been added ${measurementDate ? measurementDate : ''}`} />
                            </div>
                        </div>
                        <div className="row center-align">
                            <div className="col s12">
                                <form onSubmit={this.onSubmitHandle}>
                                    {
                                        inputsArray.map((input, i) => {
                                            return (<InputField minVal={input.min ? input.min : null}
                                                maxVal={input.max ? input.max : null}
                                                value={input.id === 'date-input' ? inputValues.date : inputValues.weight}
                                                showDatepicker={input.id === 'date-input' ? this.showDatepicker : null}
                                                changeValue={this.handleOnChange} key={i} type={input.type} id={input.id}
                                                classes={input.classes}
                                                label={input.label} />
                                            )
                                        })
                                    }
                                    <Button onKeyUp={this.onSubmitHandle} classes={`btn btn-large blue waves-effect ${inputValues.weight && inputValues.date ? '' : 'disabled'}`} content='Add weight mesurement' />
                                </form>
                            </div>
                        </div>
                        {this.props.redirect ? <Redirect to="/measurement/results" /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        redirect: state.measurement.redirect,
        userAuthID: state.firebase.auth.uid,
        usersID: state.firestore.ordered,
        measurements: !isEmpty(state.firestore.ordered.measurements) ? state.firestore.ordered.measurements : {}
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendDataToDatabase: (data) => dispatch(sendDataToDatabase(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (isEmpty(props.usersID)) {
            return [
                { collection: 'users' }
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