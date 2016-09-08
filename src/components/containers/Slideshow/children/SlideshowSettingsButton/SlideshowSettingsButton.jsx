/**
 * Slideshow Settings Button Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Simple icon button for toggling settings panel
 *    on and off
 */

import React from 'react';
import { connect } from 'react-redux';
import { toggleSettings } from 'actions/slideshow/slideshowActions';
import styles from './SlideshowSettingsButton.css';

const propTypes = {
    onClick: React.PropTypes.func.isRequired
  },
  // actions that this view can dispatch/trigger
  mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(
      toggleSettings()
    )
  });

function SlideshowSettingsButton({
  onClick
}) {
  return (
    <button
      className={`${styles.root} icon-cog`}
      onClick={onClick}
    />
  );
}

// validate that this component is passed the properties it expects
SlideshowSettingsButton.propTypes = propTypes;

// export the redux-connected component
export default connect(null, mapDispatchToProps)(SlideshowSettingsButton);
