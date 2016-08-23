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
import * as SlideshowPrevNextButtonActions from './SlideshowPrevNextButtonActions.js';

// styles specific to this component
import styles from './SlideshowPrevNextButton.css';

const

    // component jsx markup
    SlideshowPrevNextButton = (props) => (
        <div
            className={`${styles.root} ${props.prev ? styles.prev : styles.next}`}
            onClick={() => props.actions.onClick(props.prev ? 'prev' : 'next')}
        >
            <i
                className={`
                    ${styles.icon}
                    ${props.prev ? 'icon-arrow-left2' : 'icon-arrow-right2'}
                `}
            />
        </div>
    ),

    // takes redux state as an input and remaps it to props for this component
    mapStateToProps = () => ({}),

    // takes redux dispatch function as an input and remaps it to props for this component
    mapDispatchToProps = (dispatch) => ({
        actions: {
            onClick: (direction) => {
                if (direction === 'prev') {
                    dispatch(SlideshowPrevNextButtonActions.prev());
                } else {
                    dispatch(SlideshowPrevNextButtonActions.next());
                }
            }
        }
    });

// validate that this component is passed the properties it expects
SlideshowPrevNextButton.propTypes = {
    actions: React.PropTypes.shape({
        onClick: React.PropTypes.func.isRequired
    }).isRequired,
    next: React.PropTypes.bool,
    prev: React.PropTypes.bool
};

// export this redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(SlideshowPrevNextButton);
