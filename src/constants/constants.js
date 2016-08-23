import keyMirror from 'keymirror';

export const

    ACTIONS = Object.freeze(keyMirror({
        SLIDE_VIEW: null,
        SLIDESHOW_CONTROLS_DOT_SELECT: null,
        SLIDESHOW_CONTROLS_INTERVAL_TICK: null,
        SLIDESHOW_CONTROLS_NEXT: null,
        SLIDESHOW_CONTROLS_PREV: null,
        SLIDESHOW_CONTROLS_SET_AMOUNT_OF_SLIDES: null,
        SLIDESHOW_JSON_RECEIVE: null,
        SLIDESHOW_JSON_RECEIVE_ERROR: null,
        SLIDESHOW_JSON_REQUEST: null,
        SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE: null,
        SLIDESHOW_SETTINGS_CHANGE_TRANSITION: null,
        SLIDESHOW_SETTINGS_TOGGLE: null
    })),

    NAME = 'React Redux Slideshow Example App';
