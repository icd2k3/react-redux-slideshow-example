import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onClick: (slideIndex) => dispatch({
        slideIndex,
        type: ACTIONS.SLIDESHOW_CONTROLS_DOT_SELECT
    })
});
