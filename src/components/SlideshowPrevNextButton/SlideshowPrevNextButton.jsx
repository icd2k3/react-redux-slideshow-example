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
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import SlideshowPrevNextButtonActions from './SlideshowPrevNextButtonActions';

// styles specific to this component
import styles from './SlideshowPrevNextButton.css';

const propTypes = {
    onNext: React.PropTypes.func.isRequired,
    onPrev: React.PropTypes.func.isRequired,
    prev: React.PropTypes.bool
};

function SlideshowPrevNextButton({
    onNext,
    onPrev,
    prev
}) {
    return (
        <div
            className={`${styles.root} ${prev ? styles.prev : styles.next}`}
            onClick={prev ? onPrev : onNext}
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
export default connect(null, SlideshowPrevNextButtonActions)(SlideshowPrevNextButton);
