import { expect } from 'chai';
import { reducerActionHandler } from 'testUtils';
import { ACTIONS } from 'constants';
import slideshowReducer, { defaultState } from './slideshowReducer';

describe('slideshowReducer', () => {
  it('Should return initial state, even with bad input', (done) => {
    expect(slideshowReducer()).to.eql(defaultState);
    expect(slideshowReducer(), {}).to.eql(defaultState);
    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_REQUEST} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: defaultState,
            // action to be handeled by the reducer which will modify state
      action: {
        type: ACTIONS.SLIDESHOW_JSON_REQUEST
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        loading: true
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_RECEIVE} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: Object.assign({}, defaultState, {
        loading: true
      }),
            // action to be handeled by the reducer which will modify state
      action: {
        parsedJSON: 'mock',
        type: ACTIONS.SLIDESHOW_JSON_RECEIVE
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        slides: 'mock',
        loading: false
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR} action`, (done) => {
    const mockError = new Error('mock');

    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: Object.assign({}, defaultState, {
        loading: true
      }),
            // action to be handeled by the reducer which will modify state
      action: {
        error: mockError,
        type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        error: mockError,
        loading: false
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_TOGGLE_SETTINGS} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: defaultState,
            // action to be handeled by the reducer which will modify state
      action: {
        type: ACTIONS.SLIDESHOW_TOGGLE_SETTINGS
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        settingsPanel: true
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: defaultState,
            // action to be handeled by the reducer which will modify state
      action: {
        backgroundSize: 'mock',
        type: ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        backgroundSize: 'mock'
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_CHANGE_TRANSITION} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: defaultState,
            // action to be handeled by the reducer which will modify state
      action: {
        transition: 'mock',
        type: ACTIONS.SLIDESHOW_CHANGE_TRANSITION
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        transition: 'mock'
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX} action`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: Object.assign({}, defaultState, {
        currentSlideIndex: 0,
        slides: [
                    { id: 'mock1', src: 'mock1', views: 1 },
                    { id: 'mock2', src: 'mock2', views: 2 }
        ]
      }),
            // action to be handeled by the reducer which will modify state
      action: {
        slideIndex: 1,
        type: ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        currentSlideIndex: 1,
        slides: [
                    { id: 'mock1', src: 'mock1', views: 1 },
                    { id: 'mock2', src: 'mock2', views: 3 }
        ]
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX} action and loop back to start if user reaches the end`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: Object.assign({}, defaultState, {
        currentSlideIndex: 1,
        slides: [
                    { id: 'mock1', src: 'mock1', views: 1 },
                    { id: 'mock2', src: 'mock2', views: 2 }
        ]
      }),
            // action to be handeled by the reducer which will modify state
      action: {
        slideIndex: 2,
        type: ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        currentSlideIndex: 0,
        slides: [
                    { id: 'mock1', src: 'mock1', views: 2 },
                    { id: 'mock2', src: 'mock2', views: 2 }
        ]
      })
    });

    done();
  });

  it(`Should handle the ${ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX} action and loop back to end if user reaches the start`, (done) => {
    reducerActionHandler({
      reducer: slideshowReducer,
            // initial state
      state: Object.assign({}, defaultState, {
        currentSlideIndex: 0,
        slides: [
                    { id: 'mock1', src: 'mock1', views: 1 },
                    { id: 'mock2', src: 'mock2', views: 2 }
        ]
      }),
            // action to be handeled by the reducer which will modify state
      action: {
        slideIndex: -1,
        type: ACTIONS.SLIDESHOW_GO_TO_SLIDE_VIA_INDEX
      },
            // expected state after handling the action above
      expectedState: Object.assign({}, defaultState, {
        currentSlideIndex: 1,
        direction: 'prev',
        slides: [
                    { id: 'mock1', src: 'mock1', views: 1 },
                    { id: 'mock2', src: 'mock2', views: 3 }
        ]
      })
    });

    done();
  });
});
