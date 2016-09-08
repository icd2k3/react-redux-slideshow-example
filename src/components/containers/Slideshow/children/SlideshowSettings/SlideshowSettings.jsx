import React from 'react';
import { connect } from 'react-redux';
import {
    changeBackgroundSize,
    changeTransition,
    toggleSettings
} from 'actions/slideshow/slideshowActions';
import SlideshowSettingsImageRow from '../SlideshowSettingsImageRow/SlideshowSettingsImageRow';
import styles from './SlideshowSettings.css';

const propTypes = {
    currentSlideIndex: React.PropTypes.number.isRequired,
    onChangeBackgroundSize: React.PropTypes.func.isRequired,
    onChangeTransition: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    settingsPanel: React.PropTypes.bool,
    slides: React.PropTypes.arrayOf(React.PropTypes.shape())
  },
    // actions that this view can dispatch/trigger
  mapDispatchToProps = dispatch => ({
    onChangeBackgroundSize: backgroundSize => dispatch(
      changeBackgroundSize(backgroundSize)
    ),
    onChangeTransition: transition => dispatch(
      changeTransition(transition)
    ),
    onClose: () => dispatch(
      toggleSettings()
    )
  });

class SlideshowSettings extends React.Component {
  shouldComponentUpdate(nextProps) {
    return Boolean(this.props.settingsPanel || nextProps.settingsPanel);
  }

  render() {
    const {
      currentSlideIndex,
      onChangeBackgroundSize,
      onChangeTransition,
      onClose,
      slides
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.inner}>
          <button
            className={`${styles.close} icon-cross`}
            onClick={onClose}
          />
          <h1>Settings</h1>
          <label htmlFor="selectTransition">Transition</label>
          <select
            id="selectTransition"
            onChange={(e) => onChangeTransition(e.target.value)}
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
          </select>
          <label htmlFor="selectBackgroundSize">Background Size</label>
          <select
            id="selectBackgroundSize"
            onChange={(e) => onChangeBackgroundSize(e.target.value)}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </select>
          <label htmlFor="imageDataList">Image Data</label>
          {slides
            && slides.map((slide, index) => (
              <SlideshowSettingsImageRow
                id={slide.id}
                key={slide.id}
                selected={currentSlideIndex === index}
                src={slide.src}
                views={slide.views}
              />
          ))}
        </div>
      </div>
    );
  }
}

// validate that this component is passed the properties it expects
SlideshowSettings.propTypes = propTypes;

// export this redux connected component
export default connect(null, mapDispatchToProps)(SlideshowSettings);

// used only for testing purposes
export { SlideshowSettings as PureSlideshowSettings };
