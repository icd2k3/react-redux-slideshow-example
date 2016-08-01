export default (store) => (next) => (action) => {
    try {
        return next(action);

    /* istanbul ignore next */
    } catch (err) {

        /* istanbul ignore next */
        console.error('Caught an exception error stack ===>', err, 'state at error is  ===>', store.getState());

        /* istanbul ignore next */
        throw err;
    }
};
