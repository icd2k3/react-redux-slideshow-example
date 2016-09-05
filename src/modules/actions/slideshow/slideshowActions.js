import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onRequestJSON: (filePath) => dispatch({
        filePath,
        type: ACTIONS.SLIDESHOW_JSON_REQUEST
    }),
    onToggleSettings: () => dispatch({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    })
});
