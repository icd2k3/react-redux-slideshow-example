import { ACTIONS } from 'constants';

const
    view = (id) => ({
        id,
        type: ACTIONS.SLIDE_VIEW
    });

module.exports = {
    view
};
