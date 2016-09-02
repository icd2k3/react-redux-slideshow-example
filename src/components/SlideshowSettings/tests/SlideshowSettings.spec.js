import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowSettings from '../SlideshowSettings';

describe('SlideshowSettings', () => {
    const mockState = {
        SlideshowControlsReducer: {
            currentSlideIndex: 1
        },
        SlideshowReducer: {
            slides: [
                { id: 'mock-id', src: 'mock-src', views: 7 },
                { id: 'mock-id-2', src: 'mock-src-2', views: 10 }
            ]
        }
    };

    describe('Basic rendering', () => {
        it('Should render expected components and content if not selected', (done) => {
            const component = mount(
                <Provider
                    store={mockStore({
                        state: mockState
                    })}
                >
                    <SlideshowSettings />
                </Provider>
            );

            expect(component).to.be.ok;
            expect(component.find('h1').text()).to.equal('Settings');
            expect(component.find('select').length, 'select').to.equal(2);
            expect(component.find('option').length, 'option').to.equal(4);
            expect(component.find('SlideshowSettingsImageRow').length, 'SlideshowSettingsImageRow').to.equal(2);
            expect(JSON.stringify(component.find('SlideshowSettingsImageRow').first().props())).to.deep.equal(JSON.stringify({
                id: 'mock-id',
                selected: false,
                src: 'mock-src',
                views: 7
            }));
            expect(JSON.stringify(component.find('SlideshowSettingsImageRow').last().props())).to.deep.equal(JSON.stringify({
                id: 'mock-id-2',
                selected: true,
                src: 'mock-src-2',
                views: 10
            }));

            done();
        });
    });

    describe('User interactions', () => {
        it(`Should dispatch ${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION} if user changes background`, (done) => {
            const store = mockStore({
                    expectedActions: [
                        {
                            transition: 'slide',
                            type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION
                        }
                    ],
                    state: mockState
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowSettings />
                    </Provider>
                );

            component.find('select').first().simulate('change', { target: { value: 'slide' } });

            store.testExpectedActions();

            done();
        });

        it(`Should dispatch ${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE} if user changes background`, (done) => {
            const store = mockStore({
                    expectedActions: [
                        {
                            backgroundSize: 'cover',
                            type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE
                        }
                    ],
                    state: mockState
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowSettings />
                    </Provider>
                );

            component.find('select').last().simulate('change', { target: { value: 'cover' } });

            store.testExpectedActions();

            done();
        });

        it(`Should dispatch ${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE} if user closes settings panel`, (done) => {
            const store = mockStore({
                    expectedActions: [
                        {
                            type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
                        }
                    ],
                    state: mockState
                }),
                component = mount(
                    <Provider store={store}>
                        <SlideshowSettings />
                    </Provider>
                );

            component.find('.icon-cross').simulate('click');

            store.testExpectedActions();

            done();
        });
    });
});
