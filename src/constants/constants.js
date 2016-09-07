import keyMirror from 'keymirror';

export const

  ACTIONS = Object.freeze(keyMirror({
    SLIDESHOW_CHANGE_BACKGROUND_SIZE: null,
    SLIDESHOW_CHANGE_TRANSITION: null,
    SLIDESHOW_GO_TO_SLIDE_VIA_INDEX: null,
    SLIDESHOW_JSON_RECEIVE: null,
    SLIDESHOW_JSON_RECEIVE_ERROR: null,
    SLIDESHOW_JSON_REQUEST: null,
    SLIDESHOW_TOGGLE_SETTINGS: null
  })),

  JSON_PATH = 'src/static/json/slideshow.json';
