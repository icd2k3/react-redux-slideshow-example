import { ACTIONS } from 'constants';
import { jsonLoader } from 'utils';

const
    dispatchRequestJSON = (filePath) => ({
        filePath,
        type: ACTIONS.SLIDESHOW_JSON_REQUEST
    }),
    dispatchReceiveJSON = (parsedJSON) => ({
        parsedJSON,
        type: ACTIONS.SLIDESHOW_JSON_RECEIVE
    }),
    dispatchErrorJSON = (error) => ({
        error,
        type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
    }),
    requestJSON = (filePath) => {
        return (dispatch) => {
            dispatch(dispatchRequestJSON(filePath));
            return jsonLoader(filePath).then(
                (response) => dispatch(dispatchReceiveJSON(response)),
                (error) => dispatch(dispatchErrorJSON(error))
            );
        };
    },
    toggleSettings = () => ({
        type: ACTIONS.SLIDESHOW_SETTINGS_TOGGLE
    });

module.exports = {
    requestJSON,
    toggleSettings
};
