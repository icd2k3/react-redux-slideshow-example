import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS, JSON_PATH } from 'constants';

import Slideshow from './Slideshow';

describe('Slideshow', () => {
  const mockState = {
    noSlide: {
      slideshowReducer: {
        backgroundSize: 'cover',
        currentSlideIndex: 0,
        direction: 'next',
        transition: 'slide'
      }
    },
    slide: {
      slideshowReducer: {
        backgroundSize: 'cover',
        currentSlideIndex: 0,
        direction: 'next',
        slides: [
          { src: 'mock', views: 10, id: 'mock' },
          { src: 'mock', views: 7, id: 'mock2' }
        ],
        transition: 'slide'
      }
    }
  };

  describe('Basic rendering', () => {
    it('Should render expected components and content if no current slide is available yet', (done) => {
      const component = mount(
        <Provider
          store={mockStore({
            state: mockState.noSlide
          })}
        >
          <Slideshow />
        </Provider>
      );

      expect(component).to.be.ok;
      expect(component.find('Slide').length, 'Slide').to.equal(0);
      expect(component.find('SlideshowControls').length, 'SlideshowControls').to.equal(0);

      done();
    });

    it('Should render expected components and content if current slide is available', (done) => {
      const component = mount(
        <Provider
          store={mockStore({
            state: mockState.slide
          })}
        >
          <Slideshow />
        </Provider>
      );

      expect(component).to.be.ok;
      expect(component.find('Slide').length, 'Slide').to.equal(1);
      expect(component.find('Slide').props().src, 'Slide.props.src').to.equal('mock');
      expect(component.find('Slide').props().views, 'Slide.props.views').to.equal(10);
      expect(component.find('SlideshowControls').length, 'SlideshowControls').to.equal(1);

      done();
    });
  });

  describe('User interactions', () => {
    it(`Should dispatch \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` on mount`, (done) => {
      const store = mockStore({
        expectedActions: [
          {
            filePath: JSON_PATH,
            type: ACTIONS.SLIDESHOW_JSON_REQUEST
          }
        ],
        state: mockState.noSlide
      });

      mount(
        <Provider store={store}>
          <Slideshow />
        </Provider>
      );

      store.testExpectedActions();

      done();
    });
  });
});
