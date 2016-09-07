/**
 * Slideshow Prev/Next Button Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Renders either the previous or next arrow buttons
 *    depending on prev/next props
 */

import React from 'react';
import { connect } from 'react-redux';

// actions this view can dispatch
import { goToSlideViaIndex } from 'actions/slideshow/slideshowActions';

// styles specific to this component
import styles from './SlideshowPrevNextButton.css';

const propTypes = {
    actions: React.PropTypes.shape({
      onClick: React.PropTypes.func.isRequired
    }).isRequired,
    currentSlideIndex: React.PropTypes.number.isRequired,
    prev: React.PropTypes.bool
  },
    // actions that this view can dispatch/trigger
  mapDispatchToProps = dispatch => ({
    actions: {
      onClick: slideIndex => dispatch(
                goToSlideViaIndex(slideIndex)
            )
    }
  });

function SlideshowPrevNextButton({
  actions,
  currentSlideIndex,
  prev
}) {
  return (
    <div
      className={`${styles.root} ${prev ? styles.prev : styles.next}`}
      onClick={() => actions.onClick(prev ? currentSlideIndex - 1 : currentSlideIndex + 1)}
    >
      <i
        className={`
          ${styles.icon}
          ${prev ? 'icon-arrow-left2' : 'icon-arrow-right2'}
        `}
      />
    </div>
  );
}

// validate that this component is passed the properties it expects
SlideshowPrevNextButton.propTypes = propTypes;

// export this redux connected component
export default connect(null, mapDispatchToProps)(SlideshowPrevNextButton);
