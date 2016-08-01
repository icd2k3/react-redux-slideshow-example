import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';

import SlideshowControls from './SlideshowControls.jsx';

describe('SlideshowControls.jsx', () => {
    const mockState = {
            SlideshowControlsReducer: {
                amountOfSlides: 10,
                currentSlideIndex: 3
            }
        },
        mockProps = {
            amountOfSlides: 10
        }

    describe('Basic rendering', () => {

        it(`Should render expected components and content if no current slide is available yet`, (done) => {
            const component = mount(
                <Provider store={mockStore({
                    state: mockState
                })}>
                    <SlideshowControls {...mockProps} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('SlideshowPrevNextButton').length, 'SlideshowPrevNextButton').to.equal(2);
            expect(component.find('SlideshowPrevNextButton').first().props().prev, 'SlideshowPrevNextButton.first().props().prev').to.be.true;
            expect(component.find('SlideshowPrevNextButton').last().props().next, 'SlideshowPrevNextButton.first().props().next').to.be.true;
            expect(component.find('SlideshowDot').length, 'SlideshowDot').to.equal(10);
            expect(component.find('SlideshowDot').first().props().selected, 'SlideshowDot.first().props().selected').to.be.false;
            expect(component.find('SlideshowDot').at(3).props().selected, 'SlideshowDot.at(3).props().selected').to.be.true;

            done();
        });

    });

});
