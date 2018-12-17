import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddBodySizeMeasurement from '../components/container/AddBodySizeMeasurement/AddBodySizeMeasurement';
import HeaderTitle from '../components/presentational/HeaderTitle/HeaderTitle';


describe('<App />', () => {
    let appWrapper;
    let appInstance;
    const app = (disableLifecycleMethods = false) =>
        shallow(<AddBodySizeMeasurement />, { disableLifecycleMethods });

    beforeEach(() => {
        appWrapper = app();
        appInstance = appWrapper.instance();
    });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    it('renders without crashing', () => {
        expect(app().exists()).toBe(true);
    });

    it('renders a div', () => {
        expect(
            appWrapper
                .first()
                .type(),
        ).toBe('div');
    });

    describe('the rendered div', () => {
        const div = () => appWrapper.first();

        it('contains everything else that gets rendered', () => {
            // Podczas wywoływania children() na wrapperze, enzyme pomija w wyszukiwaniu zewnętrzny węzeł. 
            // Dzięki temu możemy sprawdzić czy zawartość diva
            // faktycznie zawiera wszystko co renderuje <App />
            expect(div().children()).toEqual(appWrapper.children());
        });
    });
    it('renders <HeaderTitle />', () => {
        // Metoda find zwraca listę odnalezionych komponentów.
        // Najłatwiej sprawdzić czy komponent został wyrenderowany 
        // poprzez prostą asercję jej długości.
        expect(appWrapper.find(HeaderTitle).length).toBe(1);
    });
    describe('the rendered <HeaderTitle />', () => {
        const header = () => appWrapper.find(HeaderTitle);
        // headerNumber={3} content='Add new weight' classes='blue-text text-darken-1' 

        it('"headerNumber" prop has to be equle 3 and resives', () => {
            expect(header().prop('headerNumber')).toBe(3)
        });
        it('"content" prop cannot to be empty string', () => {
            expect(header().prop('content')).not.toBe('')
        });
        it('"classes" prop has to has a "blue-text text-darken-1" as a string.', () => {
            expect(header().prop('classes')).toBe('blue-text text-darken-1')
        });
    });

});

