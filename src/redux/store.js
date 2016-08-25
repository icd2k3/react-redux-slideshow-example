import { createStore, applyMiddleware, combineReducers } from 'redux';

// middleware for redux
import thunk from 'redux-thunk';
import logger from './middleware/logger.js';
import exceptionReporter from './middleware/exceptionReporter';

// individual reducer data
import SlideshowControlsReducer from './reducers/SlideshowControlsReducer.js';
import SlideshowReducer from './reducers/SlideshowReducer.js';
import SlideshowSettingsReducer from './reducers/SlideshowSettingsReducer.js';

// combine all individual reducers into 1 object
const reducer = combineReducers({
    SlideshowControlsReducer,
    SlideshowReducer,
    SlideshowSettingsReducer
});

// init redux store
let state = {};

state = reducer(state, {
    name: 'CONSTRUCT'
});

export default applyMiddleware(thunk, logger, exceptionReporter)(createStore)(reducer, state);
