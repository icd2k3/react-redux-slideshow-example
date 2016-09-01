import { ACTIONS } from 'constants';
import { jsonLoader } from 'utils';

export default (dispatch) => ({
    onRequestJSON: (filePath) => {
        dispatch({
            filePath,
            type: ACTIONS.SLIDESHOW_JSON_REQUEST
        });
        return jsonLoader(filePath).then(
            (parsedJSON) => dispatch({
                parsedJSON,
                type: ACTIONS.SLIDESHOW_JSON_RECEIVE
            }),
            (error) => dispatch({
                error,
                type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
            })
        );
    },
    onToggleSettings: () => dispatch({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    })
});
