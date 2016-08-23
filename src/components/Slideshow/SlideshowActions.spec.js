import { mockStore } from 'testUtils';
import { ACTIONS }  from 'constants';
import * as SlideshowActions from './SlideshowActions.js';

describe('SlideshowActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` and \`${ACTIONS.SLIDESHOW_JSON_RECEIVE}\` when \`requestJSON\` is called, and json is valid`, () => {
        const filePath = 'src/json/mock-valid.json';

        store = mockStore({
            expectedActions: [
                {
                    filePath,
                    type: ACTIONS.SLIDESHOW_JSON_REQUEST
                },
                {
                    parsedJSON: {mock: 'mock'},
                    type: ACTIONS.SLIDESHOW_JSON_RECEIVE
                }
            ]
        });

        return store
            .dispatch(SlideshowActions.requestJSON(filePath))
            .then(store.testExpectedActions);
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` and \`${ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR}\` when \`requestJSON\` is called, but json can not be loaded`, () => {
        const filePath = '/mock/path.json';

        store = mockStore({
            expectedActions: [
                {
                    filePath,
                    type: ACTIONS.SLIDESHOW_JSON_REQUEST
                },
                {
                    error: {},
                    type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
                }
            ]
        });

        return store
            .dispatch(SlideshowActions.requestJSON(filePath))
            .then(store.testExpectedActions);
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE}\` when \`toggleSettings\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
                }
            ]
        });

        store.dispatch(SlideshowActions.toggleSettings())
        
        store.testExpectedActions();

        done();
    });

});
