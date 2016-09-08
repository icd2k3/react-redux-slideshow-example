/**
 * Slideshow Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Main root component container for all slideshow children components.
 *    Also handles transitions between slides
 */

import React from 'react';
import { connect } from 'react-redux';
import { JSON_PATH } from 'constants';
import * as slideshowActions from 'actions/slideshow/slideshowActions';
import SlideTransition from './children/SlideTransition/SlideTransition';
import SlideshowControls from './children/SlideshowControls/SlideshowControls';
import SlideshowSettings from './children/SlideshowSettings/SlideshowSettings';
import SlideshowSettingsButton from './children/SlideshowSettingsButton/SlideshowSettingsButton';

// styles specific to this component
import styles from './Slideshow.css';

const propTypes = {
    actions: React.PropTypes.shape({
      requestJSON: React.PropTypes.func.isRequired
    }).isRequired,
    backgroundSize: React.PropTypes.oneOf(['cover', 'contain']).isRequired,
    currentSlideIndex: React.PropTypes.number.isRequired,
    direction: React.PropTypes.oneOf(['next', 'prev']).isRequired,
    settingsPanel: React.PropTypes.bool,
    slides: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    transition: React.PropTypes.oneOf(['slide', 'fade']).isRequired
  },
    // map redux state to this.props for component
  mapStateToProps = state => ({
    backgroundSize: state.slideshowReducer.backgroundSize,
    currentSlideIndex: state.slideshowReducer.currentSlideIndex,
    direction: state.slideshowReducer.direction,
    settingsPanel: state.slideshowReducer.settingsPanel,
    slides: state.slideshowReducer.slides,
    transition: state.slideshowReducer.transition
  }),
    // actions that this view can dispatch/trigger
  mapDispatchToProps = dispatch => ({
    actions: {
      requestJSON: filePath => dispatch(
        slideshowActions.requestJSON(filePath)
      )
    }
  });

class Slideshow extends React.Component {

  componentDidMount() {
    if (!this.props.slides) {
      this.props.actions.requestJSON(JSON_PATH);
    }
  }

  render() {
    const {
        backgroundSize,
        currentSlideIndex,
        direction,
        settingsPanel,
        slides,
        transition
      } = this.props,
      slide = slides && slides[currentSlideIndex];

    return (
      <div className={styles.root}>
        <div
          className={`
            ${styles.content}
            ${settingsPanel
                ? styles.contentSettingsToggled
                : ''
            }
          `}
        >
          <SlideTransition {...{ backgroundSize, direction, slide, transition }} />
          {slides &&
            <SlideshowControls {...{ currentSlideIndex, slides }} />
          }
          <SlideshowSettingsButton />
        </div>
        <SlideshowSettings {...{ currentSlideIndex, slides, settingsPanel }} />
      </div>
    );
  }
}

// validate that this component is passed the properties it expects
Slideshow.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
