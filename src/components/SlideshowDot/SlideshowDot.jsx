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
import * as SlideshowDotActions from './SlideshowDotActions.js';

// styles specific to this component
import styles from './SlideshowDot.css';

const

    // component jsx markup
    SlideshowDot = ({
        actions,
        index,
        selected
    }) => (
        <div
            className={`${styles.root} ${selected ? styles.selected : ''}`}
            onClick={
                selected
                    ? null
                    : () => actions.onClick(index)
            }
        />
    ),

    // takes redux state as an input and remaps it to props for this component
    mapStateToProps = () => ({}),

    // takes redux dispatch function as an input and remaps it to props for this component
    mapDispatchToProps = (dispatch) => ({
        actions: {
            onClick: (index) => {
                dispatch(SlideshowDotActions.selectDot(index));
            }
        }
    });

// validate that this component is passed the properties it expects
SlideshowDot.propTypes = {
    actions: React.PropTypes.shape({
        onClick: React.PropTypes.func.isRequired
    }).isRequired,
    index: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool
};

// export the redux-connected component
export default connect(mapStateToProps, mapDispatchToProps)(SlideshowDot);
