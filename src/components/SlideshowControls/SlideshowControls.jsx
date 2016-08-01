import React from 'react';
import {
    connect
} from 'react-redux';

// children components
import SlideshowPrevNextButton from '../SlideshowPrevNextButton/SlideshowPrevNextButton.jsx';
import SlideshowDot from '../SlideshowDot/SlideshowDot.jsx';

// styles specific to this component
import styles from './SlideshowControls.css';

class SlideshowControls extends React.Component {

    render() {
        const dots = [];

        for (let i = 0; i < this.props.SlideshowControlsReducer.amountOfSlides; i++) {
            dots.push(
                <SlideshowDot
                    index={i}
                    key={i}
                    selected={this.props.SlideshowControlsReducer.currentSlideIndex === i}
                />
            );
        }

        return (
            <div className={styles.root}>
                <SlideshowPrevNextButton prev/>
                <SlideshowPrevNextButton next/>
                <div className={styles.dotsContainer}>
                    {dots}
                </div>
            </div>
        );
    }
}

// component expects these props to be provided from parent
SlideshowControls.propTypes = {
    SlideshowControlsReducer: React.PropTypes.shape({
        amountOfSlides: React.PropTypes.number,
        currentSlideIndex: React.PropTypes.number.isRequired
    }).isRequired,
    dispatch: React.PropTypes.func.isRequired
};

// connects a component to a Redux store
export default connect((state) => {
    return {
        SlideshowControlsReducer: state.SlideshowControlsReducer
    };
})(SlideshowControls);
