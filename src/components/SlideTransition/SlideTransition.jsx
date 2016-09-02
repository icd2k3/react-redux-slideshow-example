/**
 * Slide Transition Component
 *
 * type:
 *    Presentational (not aware of redux)
 * description:
 *    Simple container for react-addons-css-transition-group
 *    to handle animating between slides
 */

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// children
import Slide from '../Slide/Slide';

// styles specific to this component
import styles from './SlideTransition.css';

const propTypes = {
    direction: React.PropTypes.oneOf(['next', 'prev']).isRequired,
    slide: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        src: React.PropTypes.string.isRequired,
        views: React.PropTypes.number.isRequired
    }),
    transition: React.PropTypes.oneOf(['slide', 'fade']).isRequired
};

function SlideTransition({
    direction,
    slide,
    transition
}) {
    return (
        <CSSTransitionGroup
            className={styles.root}
            transitionEnterTimeout={450}
            transitionLeaveTimeout={450}
            transitionName={
                `react-css-transition-${transition}-${direction}`
            }
        >
            {slide
                && <Slide
                    id={slide.id}
                    key={slide.id}
                    src={slide.src}
                    views={slide.views}
                />
            }
        </CSSTransitionGroup>
    );
}

// validate that this component is passed the properties it expects
SlideTransition.propTypes = propTypes;

// export the presentational component
export default SlideTransition;
