import { ACTIONS } from 'constants';

const
    selectDot = (slideIndex) => ({
        slideIndex,
        type: ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT
    });

module.exports = {
    selectDot
};
