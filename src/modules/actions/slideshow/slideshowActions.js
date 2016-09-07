import { ACTIONS } from 'constants';

export function requestJSON(filePath) {
  return {
    filePath,
    type: ACTIONS.SLIDESHOW_JSON_REQUEST
  };
}

export function toggleSettings() {
  return {
    type: ACTIONS.SLIDESHOW_TOGGLE_SETTINGS
  };
}

export function goToSlideViaIndex(slideIndex) {
  return {
    slideIndex,
    type: ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX
  };
}

export function changeBackgroundSize(backgroundSize) {
  return {
    backgroundSize,
    type: ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE
  };
}

export function changeTransition(transition) {
  return {
    transition,
    type: ACTIONS.SLIDESHOW_CHANGE_TRANSITION
  };
}

export function receiveJSON(parsedJSON) {
  return {
    parsedJSON,
    type: ACTIONS.SLIDESHOW_JSON_RECEIVE
  };
}

export function receiveJSONError(error) {
  return {
    error,
    type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
  };
}
