import React, { Component } from 'react'
import './AddWeightMeasurement.css'
import HeaderTitle from '../presentational/HeaderTitle'
import InputField from '../presentational/InputField'

class AddWeightMeasurement extends Component {
  render() {
    return (
      <div className='add-weight-measurement container'>
        <div className="row">
            <HeaderTitle headerNumber={3} content='Add new weight' classes='center-align blue-text text-darken-1'/>
        </div>
        <div className="row center-align">
            <div className="col s12">
                <form>
                    {
                        // this.props.inputsArray.map((input, i) => {
                        //     <InputField key={i} type={input.type} id={input.id} classes={input.classes} label={input.label}/>
                        // })
                    }
                </form>
            </div>
        </div>
      </div>
    )
  }
}

export default AddWeightMeasurement;