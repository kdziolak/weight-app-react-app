import React, { Component } from 'react';
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle';

class AddBodySizeMeasurement extends Component {
    render() {
        return (
            <div data-testid="add-body-size-measurement-text" > <HeaderTitle headerNumber={3} content='Add new weight' classes='blue-text text-darken-1' /></div >
        );
    }

}

export default AddBodySizeMeasurement;