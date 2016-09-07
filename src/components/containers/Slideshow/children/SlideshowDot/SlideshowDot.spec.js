import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowDot from './SlideshowDot';

describe('SlideshowDot', () => {
    const mockProps = {
        normal: {
            index: 3
        },
        selected: {
            index: 2,
            selected: true
        }
    };

    describe('Basic rendering', () => {
        it('Should render expected components and content if not selected', (done) => {
            const component = mount(
                <Provider store={mockStore()}>
                    <SlideshowDot {...mockProps.normal} />
                </Provider>
            );

            expect(component).to.be.ok;

            done();
        });

        it('Should render expected components and content if selected', (done) => {
            const component = mount(
                <Provider store={mockStore()}>
                    <SlideshowDot {...mockProps.selected} />
                </Provider>
            );

            expect(component).to.be.ok;

            done();
        });
    });

    describe('User interactions', () => {
        it(`Should dispatch ${ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT} on click`, (done) => {
            const store = mockStore({
                    expectedActions: [{
                        slideIndex: 3,
                        type: ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX
                    }]
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowDot {...mockProps.normal} />
                    </Provider>
                );

            component.find('SlideshowDot').simulate('click');

            store.testExpectedActions();

            done();
        });

        it('Shouldn\'t dispatch anything on click if it is already selected', (done) => {
            const store = mockStore({
                    expectedActions: []
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowDot {...mockProps.selected} />
                    </Provider>
                );

            component.find('SlideshowDot').simulate('click');

            store.testExpectedActions();

            done();
        });
    });
});
