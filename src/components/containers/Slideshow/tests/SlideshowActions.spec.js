import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowActions from '../SlideshowActions';

describe('SlideshowActions', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` and \`${ACTIONS.SLIDESHOW_JSON_RECEIVE}\` when \`requestJSON\` is called, and json is valid`, () => {
        const filePath = 'src/static/json/mock-valid.json';

        store = mockStore({
            expectedActions: [
                {
                    filePath,
                    type: ACTIONS.SLIDESHOW_JSON_REQUEST
                },
                {
                    parsedJSON: { mock: 'mock' },
                    type: ACTIONS.SLIDESHOW_JSON_RECEIVE
                }
            ]
        });

        return SlideshowActions(store.dispatch)
            .onRequestJSON(filePath)
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

        return SlideshowActions(store.dispatch)
            .onRequestJSON(filePath)
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

        SlideshowActions(store.dispatch).onToggleSettings();

        store.testExpectedActions();

        done();
    });
});
