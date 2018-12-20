import React, { Component } from 'react';
import { connect } from 'react-redux'
import './AddBodySizeMeasurement.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import Body from '../../../img/body.png'
import ImageContainer from '../../presentational/ImageContainer/ImageContainer'
import InputField from '../../presentational/InputField/InputField';

class AddBodySizeMeasurement extends Component {
    state = {
        bodyPartsSize: {
            neck: 0,
            chest: 0,
            biceps: 0,
            weist: 0,
            hip: 0,
            thigh: 0
        }
    }

    handleChange = (e) => {
        console.log(e.target.dataset.key)
    }

    render() {

        return (
            <div data-testid="add-body-size-measurement-text" className='add-body-size-measurement component-padding' >
                <div className='container'>
                    <div className='row'>
                        <div className='col s12'>
                            <HeaderTitle headerNumber={3} content='Add new weight' classes='blue-text text-darken-1' />
                        </div>
                    </div>
                    <div className='row card-panel'>
                        <div className='col s12 l6 '>
                            <ImageContainer classes='add-body-size-img-scale'>
                                <img src={Body} className='responsive-img'></img>
                            </ImageContainer>
                        </div>
                        <div className='col s12 l6'>
                            <HeaderTitle headerNumber={4} content='Sizes: ' classes='blue-text text-darken-1' />
                            <form>
                                {
                                    this.props.bodyParts.map(bodyPart => (
                                        <InputField
                                            key={bodyPart}
                                            id={bodyPart}
                                            label={bodyPart}
                                            dataKey={bodyPart}
                                            changeValue={this.handleChange}
                                            type='number'
                                            step='.01'
                                        />
                                    ))
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        bodyParts: state.bodyMeasurement.bodyParts
    }
}

export default connect(mapStateToProps, null)(AddBodySizeMeasurement);