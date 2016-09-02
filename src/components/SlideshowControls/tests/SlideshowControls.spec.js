import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';

import SlideshowControls from '../SlideshowControls';

describe('SlideshowControls', () => {
    const mockProps = {
        currentSlideIndex: 3,
        slides: [{}, {}, {}, {}]
    };

    describe('Basic rendering', () => {
        it('Should render expected components and content', (done) => {
            const component = mount(
                <Provider
                    store={mockStore()}
                >
                    <SlideshowControls {...mockProps} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('SlideshowPrevNextButton').length, 'SlideshowPrevNextButton').to.equal(2);
            expect(component.find('SlideshowPrevNextButton').first().props().prev, 'SlideshowPrevNextButton.first().props().prev').to.be.true;
            expect(component.find('SlideshowPrevNextButton').last().props().next, 'SlideshowPrevNextButton.first().props().next').to.be.true;
            expect(component.find('SlideshowDot').length, 'SlideshowDot').to.equal(4);
            expect(component.find('SlideshowDot').first().props().selected, 'SlideshowDot.first().props().selected').to.be.false;
            expect(component.find('SlideshowDot').at(3).props().selected, 'SlideshowDot.at(3).props().selected').to.be.true;

            done();
        });
    });
});
