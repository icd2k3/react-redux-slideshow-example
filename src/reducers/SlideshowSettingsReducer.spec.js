import { reducerActionHandler } from 'testUtils';
import { ACTIONS }  from 'constants';
import SlideshowSettingsReducer, { defaultState } from './SlideshowSettingsReducer.js';

describe('SlideshowSettingsReducer.js', () => {

    it('Should return initial state, even with bad input', (done) => {
        expect(SlideshowSettingsReducer()).to.eql(defaultState);
        expect(SlideshowSettingsReducer(), {}).to.eql(defaultState);
        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowSettingsReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                toggled: true
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowSettingsReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                backgroundSize: 'mock',
                type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                backgroundSize: 'mock'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowSettingsReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                transition: 'mock',
                type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                transition: 'mock'
            })
        });

        done();
    });
});
