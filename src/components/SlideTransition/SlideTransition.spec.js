import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';

import SlideTransition from './SlideTransition.jsx';

describe('SlideTransition.jsx', () => {
    const mockState = {
            SlideshowSettingsReducer: {
                backgroundSize: 'cover'
            }
        },
        mockProps = {
            slide: {
                direction: 'next',
                slide: {
                    id: 'mock',
                    src: 'mock',
                    views: 1
                },
                transition: 'slide'
            },
            noSlide: {
                direction: 'next',
                direction: 'slide'
            }
        };

    describe('Basic rendering', () => {

        it(`Should render expected components and content if no current slide is available yet`, (done) => {
            const component = mount(
                <Provider store={mockStore({
                    state: mockState
                })}>
                    <SlideTransition {...mockProps.noSlide} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('Slide').length, 'Slide').to.equal(0);

            done();
        });

        it(`Should render expected components and content if slide is passed`, (done) => {
            const component = mount(
                <Provider store={mockStore({
                    state: mockState
                })}>
                    <SlideTransition {...mockProps.slide} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('Slide').length, 'Slide').to.equal(1);

            done();
        });

    });

});
