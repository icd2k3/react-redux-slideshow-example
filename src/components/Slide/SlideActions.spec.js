import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import * as SlideActions from './SlideActions.js';

describe('SlideActions.js', () => {
    let store;

    beforeEach(() => {
        store = null;
    });

    it(`Dispatches \`${ACTIONS.SLIDE_VIEW}\` when \`view\` is called`, (done) => {
        store = mockStore({
            expectedActions: [
                {
                    id: 'mock',
                    type: ACTIONS.SLIDE_VIEW
                }
            ]
        });

        store.dispatch(SlideActions.view('mock'));

        store.testExpectedActions();

        done();
    });
});
