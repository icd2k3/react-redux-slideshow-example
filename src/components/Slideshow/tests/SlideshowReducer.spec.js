import { expect } from 'chai';
import { reducerActionHandler } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowReducer, { defaultState } from '../SlideshowReducer';

describe('SlideshowReducer', () => {
    it('Should return initial state, even with bad input', (done) => {
        expect(SlideshowReducer()).to.eql(defaultState);
        expect(SlideshowReducer(), {}).to.eql(defaultState);
        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_REQUEST} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_JSON_REQUEST
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                loading: true
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_RECEIVE} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowReducer,
            // initial state
            state: Object.assign({}, defaultState, {
                loading: true
            }),
            // action to be handeled by the reducer which will modify state
            action: {
                parsedJSON: 'mock',
                type: ACTIONS.SLIDESHOW_JSON_RECEIVE
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                slides: 'mock',
                loading: false
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR} action`, (done) => {
        const mockError = new Error('mock');

        reducerActionHandler({
            reducer: SlideshowReducer,
            // initial state
            state: Object.assign({}, defaultState, {
                loading: true
            }),
            // action to be handeled by the reducer which will modify state
            action: {
                error: mockError,
                type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                error: mockError,
                loading: false
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDE_VIEW} action`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides: [
                { id: 'mock', views: 2 },
                { id: 'something', views: 0 }
            ]
        });

        reducerActionHandler({
            reducer: SlideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                id: 'mock',
                type: ACTIONS.SLIDE_VIEW
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                slides: [
                    { id: 'mock', views: 3 },
                    { id: 'something', views: 0 }
                ]
            })
        });

        done();
    });
});
