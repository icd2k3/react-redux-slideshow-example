import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onChangeBackgroundSize: (backgroundSize) => dispatch({
        backgroundSize,
        type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE
    }),
    onChangeTransition: (transition) => dispatch({
        transition,
        type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION
    }),
    onToggle: () => dispatch({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    })
});
