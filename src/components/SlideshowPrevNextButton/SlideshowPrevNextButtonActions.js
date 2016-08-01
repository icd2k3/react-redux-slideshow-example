import { ACTIONS } from 'constants';

const
    next = () => ({
        type: ACTIONS.SLIDESHOW_CONTROLS_NEXT
    }),
    prev = () => ({
        type: ACTIONS.SLIDESHOW_CONTROLS_PREV
    });

module.exports = {
    next,
    prev
};
