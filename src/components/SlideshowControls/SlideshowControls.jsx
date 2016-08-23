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
import SlideshowPrevNextButton from '../SlideshowPrevNextButton/SlideshowPrevNextButton.jsx';
import SlideshowDot from '../SlideshowDot/SlideshowDot.jsx';

// styles specific to this component
import styles from './SlideshowControls.css';

const

    // component jsx markup
    SlideshowControls = (props) => (
        <div className={styles.root}>
            <SlideshowPrevNextButton prev />
            <SlideshowPrevNextButton next />
            <div className={styles.dotsContainer}>
                {props.SlideshowReducer.slides.map((slide, i) => (
                    <SlideshowDot
                        index={i}
                        key={i}
                        selected={props.SlideshowControlsReducer.currentSlideIndex === i}
                    />
                ))}
            </div>
        </div>
    ),

    // takes redux state as an input and remaps it to props for this component
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer
    }),

    // takes redux dispatch function as an input and remaps it to props for this component
    mapDispatchToProps = () => ({});

// validate that this component is passed the properties it expects
SlideshowControls.propTypes = {
    SlideshowControlsReducer: React.PropTypes.shape({
        amountOfSlides: React.PropTypes.number,
        currentSlideIndex: React.PropTypes.number.isRequired
    }).isRequired,
    SlideshowReducer: React.PropTypes.shape({
        slides: React.PropTypes.array.isRequired
    }).isRequired
};

// export this redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(SlideshowControls);
