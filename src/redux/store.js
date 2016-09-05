import { createStore, applyMiddleware, combineReducers } from 'redux';

// individual reducer data
import SlideshowReducer from 'components/containers/Slideshow/SlideshowReducer';

// middleware for redux
import createSagaMiddleware from 'redux-saga';
import logger from './middleware/logger';
import exceptionReporter from './middleware/exceptionReporter';

// sagas
import sagas from '../modules/sagas';

// combine all individual reducers into 1 object
const reducer = combineReducers({
        SlideshowReducer
    }),
    saga = createSagaMiddleware(),
    store = createStore(
        reducer,
        applyMiddleware(saga, logger, exceptionReporter)
    );

saga.run(sagas);

export default store;
