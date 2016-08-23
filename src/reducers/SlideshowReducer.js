import { ACTIONS } from 'constants';
import { generateId } from 'utils';

export const defaultState = Object.freeze({
    error: null,
    slides: null,
    loading: false
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
                slide.views = 0;
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

    default:
        return state;
    }
}
