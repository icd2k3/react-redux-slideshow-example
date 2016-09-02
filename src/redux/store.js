import { createStore, applyMiddleware, combineReducers } from 'redux';

// individual reducer data
import SlideshowControlsReducer from 'components/SlideshowControls/SlideshowControlsReducer';
import SlideshowReducer from 'components/Slideshow/SlideshowReducer';
import SlideshowSettingsReducer from 'components/SlideshowSettings/SlideshowSettingsReducer';

// middleware for redux
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import exceptionReporter from './middleware/exceptionReporter';

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
