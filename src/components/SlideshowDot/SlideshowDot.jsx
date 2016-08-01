import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import * as SlideshowDotActions from './SlideshowDotActions.js';

// styles specific to this component
import styles from './SlideshowDot.css';

class SlideshowDot extends React.Component {
    render() {
        return (
            <div
                className={`${styles.root} ${this.props.selected ? styles.selected : ''}`}
                onClick={
                    this.props.selected
                        ? null
                        : this.props.dispatch.bind(this, SlideshowDotActions.selectDot(this.props.index))
                }
            />
        );
    }
}

// component expects these props to be provided from parent
SlideshowDot.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool
};

// connects a component to Redux store so we can use dispatcher
export default connect(() => {
    return {};
})(SlideshowDot);
