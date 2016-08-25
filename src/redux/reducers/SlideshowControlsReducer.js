import { ACTIONS } from 'constants';

export const defaultState = Object.freeze({
    amountOfSlides: null,
    currentSlideIndex: 0,
    direction: 'next'
});

export default function (state = defaultState, action = {}) {
    switch (action.type) {

    case ACTIONS.SLIDESHOW_JSON_RECEIVE:
        return Object.assign({}, state, {
            amountOfSlides: action.parsedJSON.length
        });

    case ACTIONS.SLIDESHOW_CONTROLS_NEXT:
        return Object.assign({}, state, {
            currentSlideIndex:
                state.currentSlideIndex >= state.amountOfSlides - 1
                    ? 0
                    : state.currentSlideIndex + 1,
            direction: 'next'
        });

    case ACTIONS.SLIDESHOW_CONTROLS_PREV:
        return Object.assign({}, state, {
            currentSlideIndex:
                state.currentSlideIndex === 0
                    ? state.amountOfSlides - 1
                    : state.currentSlideIndex - 1,
            direction: 'prev'
        });

    case ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT:
        return Object.assign({}, state, {
            currentSlideIndex: action.slideIndex,
            direction: action.slideIndex > state.currentSlideIndex ? 'next' : 'prev'
        });

    default:
        return state;
    }
}
