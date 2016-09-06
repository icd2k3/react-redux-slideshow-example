import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowActions from './SlideshowActions';

describe('SlideshowActions', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` when \`requestJSON\` is called`, (done) => {
        const filePath = 'src/static/json/mock-valid.json';

        store = mockStore({
            expectedActions: [
                {
                    filePath,
                    type: ACTIONS.SLIDESHOW_JSON_REQUEST
                }
            ]
        });

        SlideshowActions(store.dispatch).onRequestJSON(filePath);

        store.testExpectedActions();

        done();
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
