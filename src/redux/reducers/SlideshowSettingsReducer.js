import { ACTIONS } from 'constants';

export const defaultState = Object.freeze({
    backgroundSize: 'cover',
    toggled: false,
    transition: 'slide'
});

export default function (state = defaultState, action = {}) {
    switch (action.type) {

    case ACTIONS.SLIDESHOW_SETTINGS_TOGGLE:
        return Object.assign({}, state, {
            toggled: !state.toggled
        });

    case ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE:
        return Object.assign({}, state, {
            backgroundSize: action.backgroundSize
        });

    case ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION:
        return Object.assign({}, state, {
            transition: action.transition
        });

    default:
        return state;
    }
}
