import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';

import SlideshowSettingsButton from '../SlideshowSettingsButton';

describe('SlideshowSettingsButton', () => {
    it(`Should dispatch ${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE} when rendered and clicked`, (done) => {
        const store = mockStore({
                expectedActions: [
                    {
                        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
                    }
                ]
            }),
            component = mount(
                <Provider store={store}>
                    <SlideshowSettingsButton />
                </Provider>
            );

        component.find('a').simulate('click');

        done();
    });
});
