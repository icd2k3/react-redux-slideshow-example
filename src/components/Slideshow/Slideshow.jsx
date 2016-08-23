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

// actions this view can dispatch
import * as SlideshowActions from './SlideshowActions.js';

// children
import SlideTransition from '../SlideTransition/SlideTransition.jsx';
import SlideshowControls from '../SlideshowControls/SlideshowControls.jsx';
import SlideshowSettings from '../SlideshowSettings/SlideshowSettings.jsx';
import SlideshowSettingsButton from '../SlideshowSettingsButton/SlideshowSettingsButton.jsx';

// styles specific to this component
import styles from './Slideshow.css';

// COMPONENT ///////////////////////////////////////
class Slideshow extends React.Component {

    componentDidMount() {
        if (!this.props.SlideshowReducer.slides) {
            this.props.actions.onRequestJSON();
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

const

    // takes redux state as an input and remaps it to props for this component
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer,
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    }),

    // takes redux dispatch function as an input and remaps it to props for this component
    mapDispatchToProps = (dispatch) => ({
        actions: {
            onRequestJSON: () => {
                dispatch(SlideshowActions.requestJSON('src/json/slideshow.json'));
            },
            onSettingsClick: () => {
                dispatch(SlideshowActions.toggleSettings());
            }
        }
    });

// validate that this component is passed the properties it expects
Slideshow.propTypes = {
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
    actions: React.PropTypes.shape({
        onRequestJSON: React.PropTypes.func.isRequired,
        onSettingsClick: React.PropTypes.func.isRequired
    }).isRequired
};

// EXPORT /////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
