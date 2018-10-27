import React from 'react';
import AddWeightMeasurement from '../components/container/AddWeightMeasurement';
import { shallow } from 'enzyme';

describe('<AddWeightMeasurement />', () => {
    it('shallow render', () => {
        const wrapper = shallow(<AddWeightMeasurement />)
        expect(wrapper.containsMatchingElement(<form></form>)).toEqual(true)
    })
})