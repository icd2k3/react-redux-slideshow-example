import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';

import Slide from './Slide.jsx';

describe('Slide.jsx', () => {
    const mockState = {
            SlideshowSettingsReducer: {
                backgroundSize: 'cover'
            }
        },
        mockProps = {
            id: 'mock',
            src: 'mock',
            views: 99
        };

    describe('Basic rendering', () => {

        it('Should render expected components and content if passed expected props', (done) => {
            const component = mount(
                <Provider store={mockStore({
                    state: mockState
                })}>
                    <Slide {...mockProps} />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('SlideInfo').length, 'expect slide info').to.equal(1);
            expect(component.find('SlideInfo').props().views, 'expect slide info to be sent views').to.equal(mockProps.views);

            done();
        });

    });

    describe('User interactions', () => {

        it(`Should dispatch ${ACTIONS.SLIDE_VIEW} on mount`, (done) => {
            const store = mockStore({
                    state: mockState,
                    expectedActions: [{
                        id: mockProps.id,
                        type: ACTIONS.SLIDE_VIEW
                    }]
                }),
                component = mount(
                    <Provider store={store}>
                        <Slide {...mockProps} />
                    </Provider>
                );

            store.testExpectedActions();

            done();
        });

    });

});
