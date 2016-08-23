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
import CSSTransitionGroup from 'react-addons-css-transition-group';

// actions this view can dispatch
import * as SlideshowActions from './SlideshowActions.js';

// children
import Slide from '../Slide/Slide.jsx';
import SlideshowControls from '../SlideshowControls/SlideshowControls.jsx';
import SlideshowSettings from '../SlideshowSettings/SlideshowSettings.jsx';

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
                && this.props.SlideshowReducer.slides[currentSlideIndex],
            transition = this.props.SlideshowSettingsReducer.transition,
            direction = this.props.SlideshowControlsReducer.direction;

        return (
            <div className={styles.root}>

                {/* Container */}
                <div
                    className={`
                        ${styles.content}
                        ${this.props.SlideshowSettingsReducer.toggled
                            ? styles.contentSettingsToggled
                            : ''
                        }
                        `.trim()
                    }
                >

                    {/* Slide transition container */}
                    <CSSTransitionGroup
                        className={styles.transition}
                        transitionEnterTimeout={450}
                        transitionLeaveTimeout={450}
                        transitionName={
                            `react-css-transition-${transition}-${direction}`
                        }
                    >

                        {/* current slide */}
                        {slide
                            ? <Slide
                                id={slide.id}
                                key={slide.id}
                                src={slide.src}
                                views={slide.views}
                            />
                            : null
                        }
                    </CSSTransitionGroup>

                    {/* Slideshow controls */}
                    {slide ? <SlideshowControls /> : null}

                    {/* Slideshow settings toggle button */}
                    <a
                        className={`${styles.cog} icon-cog`}
                        onClick={this.props.actions.onSettingsClick}
                    />

                </div>

                {/* Slideshow settings panel */}
                <SlideshowSettings />
            </div>
        );
    }
}

// VALIDATE PROPS //////////////////////////////////
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

// MAP PROPS ///////////////////////////////////////
const

    // takes redux state as an input and remaps it to this.props for this component
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer,
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    }),

    // takes redux dispatch function as an input and remaps it to this.props for this component
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

// EXPORT /////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
