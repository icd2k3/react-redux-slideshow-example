import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onSlideView: (id) => dispatch({
        id,
        type: ACTIONS.SLIDE_VIEW
    })
});
