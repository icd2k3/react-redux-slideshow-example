import { expect } from 'chai';
import { reducerActionHandler } from 'testUtils';
import { ACTIONS } from 'constants';
import slideshowReducer, { defaultState } from './slideshowReducer';

describe('slideshowReducer', () => {
    const slides = [
        { src: 'mock', views: 1, id: 'mock' },
        { src: 'mock', views: 2, id: 'mock2' },
        { src: 'mock', views: 3, id: 'mock3' },
        { src: 'mock', views: 4, id: 'mock4' }
    ];

    it('Should return initial state, even with bad input', (done) => {
        expect(slideshowReducer()).to.eql(defaultState);
        expect(slideshowReducer(), {}).to.eql(defaultState);
        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_REQUEST} action`, (done) => {
        reducerActionHandler({
            reducer: slideshowReducer,
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
            reducer: slideshowReducer,
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
            reducer: slideshowReducer,
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
            reducer: slideshowReducer,
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

    it(`Should handle the ${ACTIONS.SLIDESHOW_SETTINGS_TOGGLE} action`, (done) => {
        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                settingsPanel: true
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE} action`, (done) => {
        reducerActionHandler({
            reducer: slideshowReducer,
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
            reducer: slideshowReducer,
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

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_NEXT} action`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 1,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 2,
                direction: 'next'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_PREV} action`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 3
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_PREV
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 2,
                direction: 'prev'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT} action for a slide ahead of the current`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 4,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                slideIndex: 8,
                type: ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 8,
                direction: 'next'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT} action for a slide before of the current`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 3
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                slideIndex: 1,
                type: ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 1,
                direction: 'prev'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_NEXT} action and loop back to start if at end of slideshow`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 3,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 0,
                direction: 'next'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_PREV} action and loop back to end if at beginning of slideshow`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            slides,
            currentSlideIndex: 0
        });

        reducerActionHandler({
            reducer: slideshowReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_PREV
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 3,
                direction: 'prev'
            })
        });

        done();
    });
});
