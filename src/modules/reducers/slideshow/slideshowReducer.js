import { ACTIONS } from 'constants';
import { generateId } from 'utils';

export const defaultState = Object.freeze({
    backgroundSize: 'cover',
    currentSlideIndex: 0,
    direction: 'next',
    error: null,
    settingsPanel: null,
    slides: null,
    loading: null,
    transition: 'slide'
});

export default function (state = defaultState, action = {}) {
    switch (action.type) {

    case ACTIONS.SLIDESHOW_JSON_REQUEST:
        return Object.assign({}, state, {
            loading: true
        });

    case ACTIONS.SLIDESHOW_JSON_RECEIVE:
        // generate a fake id/key and initialize view count for each slide
        /* istanbul ignore next */
        if (Array.isArray(action.parsedJSON)) {
            action.parsedJSON.forEach((slide) => {
                slide.id = generateId();
                slide.views = 1; // seed with first view
            });
        }

        return Object.assign({}, state, {
            slides: Object.freeze(action.parsedJSON),
            loading: false
        });

    case ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR:
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        });

    case ACTIONS.SLIDE_VIEW:
        state.slides.filter((slide) => slide.id === action.id)[0].views++;

        return Object.assign({}, state);

    case ACTIONS.SLIDESHOW_SETTINGS_TOGGLE:
        return Object.assign({}, state, {
            settingsPanel: !state.settingsPanel
        });

    case ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE:
        return Object.assign({}, state, {
            backgroundSize: action.backgroundSize
        });

    case ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION:
        return Object.assign({}, state, {
            transition: action.transition
        });

    case ACTIONS.SLIDESHOW_CONTROLS_NEXT:
        return Object.assign({}, state, {
            currentSlideIndex:
                state.currentSlideIndex >= state.slides.length - 1
                    ? 0
                    : state.currentSlideIndex + 1,
            direction: 'next'
        });

    case ACTIONS.SLIDESHOW_CONTROLS_PREV:
        return Object.assign({}, state, {
            currentSlideIndex:
                state.currentSlideIndex === 0
                    ? state.slides.length - 1
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
