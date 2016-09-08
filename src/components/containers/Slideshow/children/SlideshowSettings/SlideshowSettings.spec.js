import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { mockStore } from 'testUtils';
import { ACTIONS } from 'constants';
import SlideshowSettings, { PureSlideshowSettings } from './SlideshowSettings';

describe('SlideshowSettings', () => {
  const mockProps = {
    currentSlideIndex: 1,
    enabled: true,
    slides: [
            { id: 'mock-id', src: 'mock-src', views: 7 },
            { id: 'mock-id-2', src: 'mock-src-2', views: 10 }
    ]
  };

  describe('Basic rendering', () => {
    it('Should render expected components and content if not selected', (done) => {
      const component = mount(
        <Provider
          store={mockStore()}
        >
          <SlideshowSettings {...mockProps} />
        </Provider>
      );

      expect(component).to.be.ok;
      expect(component.find('h1').text()).to.equal('Settings');
      expect(component.find('select').length, 'select').to.equal(2);
      expect(component.find('option').length, 'option').to.equal(4);
      expect(component.find('SlideshowSettingsImageRow').length, 'SlideshowSettingsImageRow').to.equal(2);
      expect(JSON.stringify(component.find('SlideshowSettingsImageRow').first().props())).to.deep.equal(JSON.stringify({
        id: 'mock-id',
        selected: false,
        src: 'mock-src',
        views: 7
      }));
      expect(JSON.stringify(component.find('SlideshowSettingsImageRow').last().props())).to.deep.equal(JSON.stringify({
        id: 'mock-id-2',
        selected: true,
        src: 'mock-src-2',
        views: 10
      }));

      done();
    });
  });

  describe('User interactions', () => {
    it(`Should dispatch ${ACTIONS.SLIDESHOW_CHANGE_TRANSITION} if user changes background`, (done) => {
      const store = mockStore({
          expectedActions: [
            {
              transition: 'slide',
              type: ACTIONS.SLIDESHOW_CHANGE_TRANSITION
            }
          ]
        }),
        component = mount(
          <Provider store={store}>
            <SlideshowSettings {...mockProps} />
          </Provider>
        );

      component.find('select').first().simulate('change', { target: { value: 'slide' } });

      store.testExpectedActions();

      done();
    });

    it(`Should dispatch ${ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE} if user changes background`, (done) => {
      const store = mockStore({
          expectedActions: [
            {
              backgroundSize: 'cover',
              type: ACTIONS.SLIDESHOW_CHANGE_BACKGROUND_SIZE
            }
          ]
        }),
        component = mount(
          <Provider store={store}>
            <SlideshowSettings {...mockProps} />
          </Provider>
        );

      component.find('select').last().simulate('change', { target: { value: 'cover' } });

      store.testExpectedActions();

      done();
    });

    it(`Should dispatch ${ACTIONS.SLIDESHOW_TOGGLE_SETTINGS} if user closes settings panel`, (done) => {
      const store = mockStore({
          expectedActions: [
            {
              type: ACTIONS.SLIDESHOW_TOGGLE_SETTINGS
            }
          ]
        }),
        component = mount(
          <Provider store={store}>
            <SlideshowSettings {...mockProps} />
          </Provider>
        );

      component.find('.icon-cross').simulate('click');

      store.testExpectedActions();

      done();
    });

    it('Should run `shouldComponentUpdate` when props change', (done) => {
      const component = mount(
        <PureSlideshowSettings
          onChangeBackgroundSize={() => {}}
          onChangeTransition={() => {}}
          onClose={() => {}}
          {...mockProps}
        />
      );

      component.setProps({ enabled: false });

      done();
    });
  });
});
