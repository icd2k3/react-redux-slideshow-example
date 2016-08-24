import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowPrevNextButton from './SlideshowPrevNextButton.jsx';

describe('SlideshowPrevNextButton.jsx', () => {
    describe('Basic rendering', () => {
        it('Should render expected components and content if next button', (done) => {
            const component = mount(
                <Provider store={mockStore()}>
                    <SlideshowPrevNextButton next />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('.icon-arrow-right2').length, '.icon-arrow-right2').to.equal(1);
            expect(component.find('.icon-arrow-left2').length, '.icon-arrow-left2').to.equal(0);

            done();
        });

        it('Should render expected components and content if prev button', (done) => {
            const component = mount(
                <Provider store={mockStore()}>
                    <SlideshowPrevNextButton prev />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('.icon-arrow-right2').length, '.icon-arrow-right2').to.equal(0);
            expect(component.find('.icon-arrow-left2').length, '.icon-arrow-left2').to.equal(1);

            done();
        });
    });

    describe('User interactions', () => {
        it(`Should dispatch ${ACTIONS.SLIDESHOW_CONTROLS_NEXT} on click for next button`, (done) => {
            const store = mockStore({
                    expectedActions: [{
                        type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
                    }]
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowPrevNextButton next />
                    </Provider>
                );

            component.find('SlideshowPrevNextButton').simulate('click');

            store.testExpectedActions();

            done();
        });

        it(`Should dispatch ${ACTIONS.SLIDESHOW_CONTROLS_PREV} on click for prev button`, (done) => {
            const store = mockStore({
                    expectedActions: [{
                        type: ACTIONS.SLIDESHOW_CONTROLS_PREV
                    }]
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowPrevNextButton prev />
                    </Provider>
                );

            component.find('SlideshowPrevNextButton').simulate('click');

            store.testExpectedActions();

            done();
        });
    });
});
