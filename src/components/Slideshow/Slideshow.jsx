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
import SlideshowActions from './SlideshowActions';

// children
import SlideTransition from '../SlideTransition/SlideTransition';
import SlideshowControls from '../SlideshowControls/SlideshowControls';
import SlideshowSettings from '../SlideshowSettings/SlideshowSettings';
import SlideshowSettingsButton from '../SlideshowSettingsButton/SlideshowSettingsButton';

// styles specific to this component
import styles from './Slideshow.css';

const propTypes = {
        backgroundSize: React.PropTypes.oneOf(['cover', 'contain']).isRequired,
        currentSlideIndex: React.PropTypes.number.isRequired,
        direction: React.PropTypes.oneOf(['next', 'prev']).isRequired,
        error: React.PropTypes.string,
        settingsPanel: React.PropTypes.bool,
        slides: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            src: React.PropTypes.string.isRequired,
            views: React.PropTypes.number.isRequired
        })),
        loading: React.PropTypes.bool,
        transition: React.PropTypes.oneOf(['slide', 'fade']).isRequired,
        onRequestJSON: React.PropTypes.func.isRequired
    },
    mapStateToProps = state => ({
        backgroundSize: state.SlideshowReducer.backgroundSize,
        currentSlideIndex: state.SlideshowReducer.currentSlideIndex,
        direction: state.SlideshowReducer.direction,
        error: state.SlideshowReducer.error,
        settingsPanel: state.SlideshowReducer.settingsPanel,
        slides: state.SlideshowReducer.slides,
        loading: state.SlideshowReducer.loading,
        transition: state.SlideshowReducer.transition
    });

class Slideshow extends React.Component {

    componentDidMount() {
        if (!this.props.slides) {
            this.props.onRequestJSON(JSON_PATH);
        }
    }

    render() {
        const slide = this.props.slides && this.props.slides[this.props.currentSlideIndex];

        return (
            <div className={styles.root}>
                <div
                    className={`
                        ${styles.content}
                        ${this.props.settingsPanel
                            ? styles.contentSettingsToggled
                            : ''
                        }
                    `}
                >
                    <SlideTransition
                        backgroundSize={this.props.backgroundSize}
                        direction={this.props.direction}
                        slide={slide}
                        transition={this.props.transition}
                    />
                    {this.props.slides &&
                        <SlideshowControls
                            currentSlideIndex={this.props.currentSlideIndex}
                            slides={this.props.slides}
                        />
                    }
                    <SlideshowSettingsButton />
                </div>
                <SlideshowSettings
                    currentSlideIndex={this.props.currentSlideIndex}
                    slides={this.props.slides}
                />
            </div>
        );
    }
}

// validate that this component is passed the properties it expects
Slideshow.propTypes = propTypes;

// EXPORT /////////////////////////////////////////
export default connect(mapStateToProps, SlideshowActions)(Slideshow);
