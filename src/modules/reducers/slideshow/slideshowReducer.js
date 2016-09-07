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

let adjustedIndex; // used for looping slideshow back to start/end

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

    case ACTIONS.SLIDESHOW_TOGGLE_SETTINGS:
      return Object.assign({}, state, {
        settingsPanel: !state.settingsPanel
      });

    case ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE:
      return Object.assign({}, state, {
        backgroundSize: action.backgroundSize
      });

    case ACTIONS.SLIDESHOW_CHANGE_TRANSITION:
      return Object.assign({}, state, {
        transition: action.transition
      });

    case ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX:
      adjustedIndex = action.slideIndex;

      if (adjustedIndex < 0) {
        adjustedIndex = state.slides.length - 1;
      } else if (adjustedIndex >= state.slides.length) {
        adjustedIndex = 0;
      }

      state.slides[adjustedIndex].views++;

      return Object.assign({}, state, {
        currentSlideIndex: adjustedIndex,
        direction: action.slideIndex > state.currentSlideIndex ? 'next' : 'prev'
      });

    default:
      return state;
  }
}
