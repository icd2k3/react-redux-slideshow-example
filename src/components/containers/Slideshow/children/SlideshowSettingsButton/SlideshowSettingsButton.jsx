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
import SlideshowSettingsButtonActions from './SlideshowSettingsButtonActions';

// styles specific to this component
import styles from './SlideshowSettingsButton.css';

const propTypes = {
    onClick: React.PropTypes.func.isRequired
};

function SlideshowSettingsButton({
    onClick
}) {
    return (
        <a
            className={`${styles.root} icon-cog`}
            onClick={onClick}
        />
    );
}

// validate that this component is passed the properties it expects
SlideshowSettingsButton.propTypes = propTypes;

// export the redux-connected component
export default connect(null, SlideshowSettingsButtonActions)(SlideshowSettingsButton);
