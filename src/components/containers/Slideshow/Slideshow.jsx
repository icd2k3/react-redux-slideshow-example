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
import SlideTransition from './children/SlideTransition/SlideTransition';
import SlideshowControls from './children/SlideshowControls/SlideshowControls';
import SlideshowSettings from './children/SlideshowSettings/SlideshowSettings';
import SlideshowSettingsButton from './children/SlideshowSettingsButton/SlideshowSettingsButton';

// styles specific to this component
import styles from './Slideshow.css';

const propTypes = {
        backgroundSize: React.PropTypes.oneOf(['cover', 'contain']).isRequired,
        currentSlideIndex: React.PropTypes.number.isRequired,
        direction: React.PropTypes.oneOf(['next', 'prev']).isRequired,
        onRequestJSON: React.PropTypes.func.isRequired,
        settingsPanel: React.PropTypes.bool,
        slides: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            src: React.PropTypes.string.isRequired,
            views: React.PropTypes.number.isRequired
        })),
        transition: React.PropTypes.oneOf(['slide', 'fade']).isRequired
    },
    mapStateToProps = state => ({
        backgroundSize: state.SlideshowReducer.backgroundSize,
        currentSlideIndex: state.SlideshowReducer.currentSlideIndex,
        direction: state.SlideshowReducer.direction,
        settingsPanel: state.SlideshowReducer.settingsPanel,
        slides: state.SlideshowReducer.slides,
        transition: state.SlideshowReducer.transition
    });

class Slideshow extends React.Component {

    componentDidMount() {
        const { slides, onRequestJSON } = this.props;

        if (!slides) {
            onRequestJSON(JSON_PATH);
        }
    }

    render() {
        const {
                backgroundSize,
                currentSlideIndex,
                direction,
                settingsPanel,
                slides,
                transition
            } = this.props,
            slide = slides && slides[currentSlideIndex];

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
                    <SlideTransition {...{ backgroundSize, direction, slide, transition }} />
                    {slides &&
                        <SlideshowControls {...{ currentSlideIndex, slides }} />
                    }
                    <SlideshowSettingsButton />
                </div>
                <SlideshowSettings {...{ currentSlideIndex, slides, settingsPanel }} />
            </div>
        );
    }
}

// validate that this component is passed the properties it expects
Slideshow.propTypes = propTypes;

// EXPORT /////////////////////////////////////////
export default connect(mapStateToProps, SlideshowActions)(Slideshow);
