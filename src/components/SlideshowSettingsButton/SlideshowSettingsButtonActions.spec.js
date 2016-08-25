import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import * as SlideshowSettingsButtonActions from './SlideshowSettingsButtonActions.js';

describe('SlideshowSettingsButtonActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE}\` when \`toggleSettings\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
                }
            ]
        });

        store.dispatch(SlideshowSettingsButtonActions.toggleSettings());

        store.testExpectedActions();

        done();
    });
});
