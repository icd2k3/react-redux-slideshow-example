import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onClick: () => dispatch({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    })
});
