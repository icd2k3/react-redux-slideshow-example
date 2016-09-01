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
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import SlideshowSettingsButtonActions from './SlideshowSettingsButtonActions.js';

// styles specific to this component
import styles from './SlideshowSettingsButton.css';

const SlideshowSettingsButton = ({
    onClick
}) => (
    <a
        className={`${styles.root} icon-cog`}
        onClick={onClick}
    />
);

// validate that this component is passed the properties it expects
SlideshowSettingsButton.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

// export the redux-connected component
export default connect(null, SlideshowSettingsButtonActions)(SlideshowSettingsButton);
