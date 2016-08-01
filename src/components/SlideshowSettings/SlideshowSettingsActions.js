import { ACTIONS } from 'constants';

const
    changeBackgroundSize = (backgroundSize) => ({
        backgroundSize,
        type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_BACKGROUND_SIZE
    }),
    changeTransition = (transition) => ({
        transition,
        type: ACTIONS.SLIDESHOW_SETTINGS_CHANGE_TRANSITION
    }),
    toggle = () => ({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    });

module.exports = {
    changeBackgroundSize,
    changeTransition,
    toggle
};
