/**
 * Slideshow Controls Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Container that renders next, prev, and dot selector components
 */

import React from 'react';

// children components
import SlideshowPrevNextButton from '../SlideshowPrevNextButton/SlideshowPrevNextButton';
import SlideshowDot from '../SlideshowDot/SlideshowDot';

// styles specific to this component
import styles from './SlideshowControls.css';

const propTypes = {
  currentSlideIndex: React.PropTypes.number.isRequired,
  slides: React.PropTypes.arrayOf(React.PropTypes.shape())
};

function SlideshowControls({
  currentSlideIndex,
  slides
}) {
  return (
    <div className={styles.root}>
      <SlideshowPrevNextButton currentSlideIndex={currentSlideIndex} prev />
      <SlideshowPrevNextButton currentSlideIndex={currentSlideIndex} />
      <div className={styles.dotsContainer}>
        {slides.map((slide, index) => (
          <SlideshowDot
            index={index}
            key={index}
            selected={currentSlideIndex === index}
          />
        ))}
      </div>
    </div>
  );
}

// validate that this component is passed the properties it expects
SlideshowControls.propTypes = propTypes;

export default SlideshowControls;
