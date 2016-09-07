import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from 'reducers';
import sagas from 'sagas';
import createSagaMiddleware from 'redux-saga';
import logger from './middleware/logger';
import exceptionReporter from './middleware/exceptionReporter';

// combine all individual reducers into 1 object
const reducer = combineReducers(reducers),
  saga = createSagaMiddleware(),
  store = createStore(
        reducer,
        applyMiddleware(saga, logger, exceptionReporter)
    );

saga.run(sagas);

export default store;
