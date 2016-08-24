import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import * as SlideshowSettingsActions from './SlideshowSettingsActions.js';

describe('SlideshowSettingsActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE}\` when \`changeBackgroundSize\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    backgroundSize: 'mock',
                    type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE
                }
            ]
        });

        store.dispatch(SlideshowSettingsActions.changeBackgroundSize('mock'));

        store.testExpectedActions();

        done();
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION}\` when \`changeTransition\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    transition: 'mock',
                    type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION
                }
            ]
        });

        store.dispatch(SlideshowSettingsActions.changeTransition('mock'));

        store.testExpectedActions();

        done();
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE}\` when \`toggle\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
                }
            ]
        });

        store.dispatch(SlideshowSettingsActions.toggle());

        store.testExpectedActions();

        done();
    });
});
