import { expect } from 'chai';
import { reducerActionHandler } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowControlsReducer, { defaultState } from './SlideshowControlsReducer.js';

describe('SlideshowControlsReducer.js', () => {
    it('Should return initial state, even with bad input', (done) => {
        expect(SlideshowControlsReducer()).to.eql(defaultState);
        expect(SlideshowControlsReducer(), {}).to.eql(defaultState);
        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_RECEIVE} action`, (done) => {
        reducerActionHandler({
            reducer: SlideshowControlsReducer,
            // initial state
            state: defaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                parsedJSON: [{ src: 'mock' }],
                type: ACTIONS.SLIDESHOW_JSON_RECEIVE
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, defaultState, {
                amountOfSlides: 1
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_NEXT} action`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            amountOfSlides: 10,
            currentSlideIndex: 4,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 5,
                direction: 'next'
            })
        });

        done();
    });

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_PREV} action`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            amountOfSlides: 10,
            currentSlideIndex: 4
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
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

    it(`Should handle the ${ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT} action for a slide ahead of the current`, (done) => {
        const modifiedDefaultState = Object.assign({}, defaultState, {
            amountOfSlides: 10,
            currentSlideIndex: 4,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
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
            amountOfSlides: 10,
            currentSlideIndex: 4
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
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
            amountOfSlides: 10,
            currentSlideIndex: 10,
            direction: 'prev'
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
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
            amountOfSlides: 10,
            currentSlideIndex: 0
        });

        reducerActionHandler({
            reducer: SlideshowControlsReducer,
            // initial state
            state: modifiedDefaultState,
            // action to be handeled by the reducer which will modify state
            action: {
                type: ACTIONS.SLIDESHOW_CONTROLS_PREV
            },
            // expected state after handling the action above
            expectedState: Object.assign({}, modifiedDefaultState, {
                currentSlideIndex: 9,
                direction: 'prev'
            })
        });

        done();
    });
});
