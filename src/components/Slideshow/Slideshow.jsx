/**
 * Slideshow Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Main root component container for all slideshow children components.
 *    Also handles transitions between slides
 */

import React from 'react';
import {
    connect
} from 'react-redux';

// constants
import {
    JSON_PATH
} from 'constants';

// actions this view can dispatch
import SlideshowActions from './SlideshowActions.js';

// children
import SlideTransition from '../SlideTransition/SlideTransition.jsx';
import SlideshowControls from '../SlideshowControls/SlideshowControls.jsx';
import SlideshowSettings from '../SlideshowSettings/SlideshowSettings.jsx';
import SlideshowSettingsButton from '../SlideshowSettingsButton/SlideshowSettingsButton.jsx';

// styles specific to this component
import styles from './Slideshow.css';

const propTypes = {
        SlideshowControlsReducer: React.PropTypes.shape({
            currentSlideIndex: React.PropTypes.number.isRequired,
            direction: React.PropTypes.oneOf(['prev', 'next'])
        }).isRequired,
        SlideshowReducer: React.PropTypes.shape({
            slides: React.PropTypes.arrayOf(React.PropTypes.shape({
                src: React.PropTypes.string.isRequired,
                views: React.PropTypes.number.isRequired
            }))
        }).isRequired,
        SlideshowSettingsReducer: React.PropTypes.shape({
            toggled: React.PropTypes.bool,
            transition: React.PropTypes.oneOf(['slide', 'fade']).isRequired
        }).isRequired,
        onRequestJSON: React.PropTypes.func.isRequired
    },
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer,
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    });

class Slideshow extends React.Component {

    componentDidMount() {
        if (!this.props.SlideshowReducer.slides) {
            this.props.onRequestJSON(JSON_PATH);
        }
    }

    render() {
        const currentSlideIndex = this.props.SlideshowControlsReducer.currentSlideIndex,
            slide = this.props.SlideshowReducer.slides
                && this.props.SlideshowReducer.slides[currentSlideIndex];

        return (
            <div className={styles.root}>
                <div
                    className={`
                        ${styles.content}
                        ${this.props.SlideshowSettingsReducer.toggled
                            ? styles.contentSettingsToggled
                            : ''
                        }
                    `}
                >
                    <SlideTransition
                        direction={this.props.SlideshowControlsReducer.direction}
                        slide={slide}
                        transition={this.props.SlideshowSettingsReducer.transition}
                    />
                    <SlideshowControls
                        enabled={Boolean(slide)}
                    />
                    <SlideshowSettingsButton />
                </div>
                <SlideshowSettings />
            </div>
        );
    }
}

// validate that this component is passed the properties it expects
Slideshow.propTypes = propTypes;

// EXPORT /////////////////////////////////////////
export default connect(mapStateToProps, SlideshowActions)(Slideshow);
