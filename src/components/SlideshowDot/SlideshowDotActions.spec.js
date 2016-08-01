import { mockStore } from 'testUtils';
import { ACTIONS }  from 'constants';
import * as SlideshowDotActions from './SlideshowDotActions.js';

describe('SlideshowDotActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT}\` when \`selectDot\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    slideIndex: 5,
                    type: ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT
                }
            ]
        });

        store.dispatch(SlideshowDotActions.selectDot(5));

        store.testExpectedActions();

        done();
    });

});
