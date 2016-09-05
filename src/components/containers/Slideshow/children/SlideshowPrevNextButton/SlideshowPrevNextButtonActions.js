import { ACTIONS } from 'constants';

export default (dispatch) => ({
    onNext: () => dispatch({
        type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
    }),
    onPrev: () => dispatch({
        type: ACTIONS.SLIDESHOW_CONTROLS_PREV
    })
});
