/**
 * Slideshow Dot Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Renders a single dot that can be toggled
 */

import React from 'react';
import { connect } from 'react-redux';
import { goToSlideViaIndex } from 'actions/slideshow/slideshowActions';
import styles from './SlideshowDot.css';

const propTypes = {
        actions: React.PropTypes.shape({
            goToSlideViaIndex: React.PropTypes.func.isRequired
        }).isRequired,
        index: React.PropTypes.number.isRequired,
        selected: React.PropTypes.bool
    },
    // actions that this view can dispatch/trigger
    mapDispatchToProps = dispatch => ({
        actions: {
            goToSlideViaIndex: slideIndex => dispatch(
                goToSlideViaIndex(slideIndex)
            )
        }
    });

function SlideshowDot({
    actions,
    index,
    selected
}) {
    return (
        <div
            className={`${styles.root} ${selected ? styles.selected : ''}`}
            onClick={
                selected
                    ? null
                    : () => actions.goToSlideViaIndex(index)
            }
        />
    );
}

// validate that this component is passed the properties it expects
SlideshowDot.propTypes = propTypes;

// export the redux-connected component
export default connect(null, mapDispatchToProps)(SlideshowDot);
