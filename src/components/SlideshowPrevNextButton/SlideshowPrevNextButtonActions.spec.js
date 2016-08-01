import { mockStore } from 'testUtils';
import { ACTIONS }  from 'constants';
import * as SlideshowPrevNextButtonActions from './SlideshowPrevNextButtonActions.js';

describe('SlideshowPrevNextButtonActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_CONTROLS_NEXT}\` when \`next\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
                }
            ]
        });

        store.dispatch(SlideshowPrevNextButtonActions.next());

        store.testExpectedActions();

        done();
    });

    it(`Dispatches \`${ACTIONS.SLIDESHOW_CONTROLS_PREV}\` when \`prev\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    type: ACTIONS.SLIDESHOW_CONTROLS_PREV
                }
            ]
        });

        store.dispatch(SlideshowPrevNextButtonActions.prev());

        store.testExpectedActions();

        done();
    });

});
