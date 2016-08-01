import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import * as SlideshowPrevNextButtonActions from './SlideshowPrevNextButtonActions.js';

// styles specific to this component
import styles from './SlideshowPrevNextButton.css';

class SlideshowPrevNextButton extends React.Component {
    onClick(direction) {
        if (!this.rateLimitTimer) {
            if (direction === 'prev') {
                this.props.dispatch(SlideshowPrevNextButtonActions.prev());
            } else {
                this.props.dispatch(SlideshowPrevNextButtonActions.next());
            }
            // limit to prevent user from spamming next/prev buttons. It doesn't break
            // the slideshow, but it can produce some odd transition animations
            this.rateLimitTimer = setTimeout(() => {
                this.rateLimitTimer = null;
            }, 200);
        }
    }

    render() {
        return (
            <div
                className={`${styles.root} ${this.props.prev ? styles.prev : styles.next}`}
                onClick={this.onClick.bind(this, (this.props.prev ? 'prev' : 'next'))}
            >
                <i className={`${styles.icon} ${this.props.prev ? 'icon-arrow-left2' : 'icon-arrow-right2'}`}/>
            </div>
        );
    }
}

// component expects these props to be provided from parent
SlideshowPrevNextButton.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    next: React.PropTypes.bool,
    prev: React.PropTypes.bool
};

// connects a component to a Redux store so we can use dispatcher
export default connect(() => {
    return {};
})(SlideshowPrevNextButton);
