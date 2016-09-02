/**
 * Slideshow Controls Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Container that renders next, prev, and dot selector components
 */

import React from 'react';
import {
    connect
} from 'react-redux';

// children components
import SlideshowPrevNextButton from '../SlideshowPrevNextButton/SlideshowPrevNextButton';
import SlideshowDot from '../SlideshowDot/SlideshowDot';

// styles specific to this component
import styles from './SlideshowControls.css';

const propTypes = {
        SlideshowControlsReducer: React.PropTypes.shape({
            currentSlideIndex: React.PropTypes.number.isRequired
        }).isRequired,
        SlideshowReducer: React.PropTypes.shape({
            slides: React.PropTypes.array
        }).isRequired,
        enabled: React.PropTypes.bool.isRequired
    },
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer
    });

function SlideshowControls({
    SlideshowControlsReducer,
    SlideshowReducer,
    enabled
}) {
    return (enabled &&
        <div className={styles.root}>
            <SlideshowPrevNextButton prev />
            <SlideshowPrevNextButton next />
            <div className={styles.dotsContainer}>
                {SlideshowReducer.slides.map((slide, i) => (
                    <SlideshowDot
                        index={i}
                        key={i}
                        selected={SlideshowControlsReducer.currentSlideIndex === i}
                    />
                ))}
            </div>
        </div>
    );
}

// validate that this component is passed the properties it expects
SlideshowControls.propTypes = propTypes;

// export this redux connected component
export default connect(mapStateToProps)(SlideshowControls);
