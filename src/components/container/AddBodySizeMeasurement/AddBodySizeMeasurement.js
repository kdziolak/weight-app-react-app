import React, { Component } from 'react';
import { connect } from 'react-redux'
import './AddBodySizeMeasurement.css'
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';
import Body from '../../../img/body.png'
import ImageContainer from '../../presentational/ImageContainer/ImageContainer'
import InputField from '../../presentational/InputField/InputField';
import Button from '../../presentational/Button/Button'

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
        this.setState({
            bodyPartsSize: {
                ...this.state.bodyPartsSize,
                [e.target.dataset.key]: e.target.value
            }
        })
    }

    handleSubmit = () => {
        const { neck, chest, biceps, weist, hip, thigh } = this.state.bodyPartsSize;

        console.log(this.state.bodyPartsSize)

        if (neck && chest && biceps && weist && hip && thigh) {
            console.log('send data')
        } else {
            console.log('nie wysłano')
        }
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
                            <form onSubmit={this.handleSubmit}>
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
                                <Button id={'body-size-button'} classes={'btn btn-large blue waves-effect'} content={'add measurements'} />
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