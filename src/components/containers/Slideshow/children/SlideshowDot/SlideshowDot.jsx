/**
 * Slideshow Dot Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Renders a single dot that can be toggled
 */

import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import SlideshowDotActions from './SlideshowDotActions';

// styles specific to this component
import styles from './SlideshowDot.css';

const propTypes = {
    index: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
};

function SlideshowDot({
    index,
    onClick,
    selected
}) {
    return (
        <div
            className={`${styles.root} ${selected ? styles.selected : ''}`}
            onClick={
                selected
                    ? null
                    : () => onClick(index)
            }
        />
    );
}

// validate that this component is passed the properties it expects
SlideshowDot.propTypes = propTypes;

// export the redux-connected component
export default connect(null, SlideshowDotActions)(SlideshowDot);