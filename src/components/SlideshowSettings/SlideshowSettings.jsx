import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import SlideshowSettingsActions from './SlideshowSettingsActions';

// child components
import SlideshowSettingsImageRow from '../SlideshowSettingsImageRow/SlideshowSettingsImageRow';

// styles specific to this component
import styles from './SlideshowSettings.css';

const propTypes = {
        SlideshowControlsReducer: React.PropTypes.shape({
            currentSlideIndex: React.PropTypes.number.isRequired
        }).isRequired,
        SlideshowReducer: React.PropTypes.shape({
            slides: React.PropTypes.arrayOf(React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                src: React.PropTypes.string.isRequired,
                views: React.PropTypes.number.isRequired
            }))
        }).isRequired,
        onChangeBackgroundSize: React.PropTypes.func.isRequired,
        onChangeTransition: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired
    },
    mapStateToProps = (state) => ({
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer
    });

function SlideshowSettings({
    SlideshowControlsReducer,
    SlideshowReducer,
    onChangeBackgroundSize,
    onChangeTransition,
    onToggle
}) {
    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <i
                    className={`${styles.close} icon-cross`}
                    onClick={onToggle}
                />
                <h1>Settings</h1>
                <label htmlFor="selectTransition">Transition</label>
                <select
                    id="selectTransition"
                    onChange={(e) => onChangeTransition(e.target.value)}
                >
                    <option value="slide">Slide</option>
                    <option value="fade">Fade</option>
                </select>
                <label htmlFor="selectBackgroundSize">Background Size</label>
                <select
                    id="selectBackgroundSize"
                    onChange={(e) => onChangeBackgroundSize(e.target.value)}
                >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                </select>
                <label htmlFor="imageDataList">Image Data</label>
                {SlideshowReducer.slides
                    && SlideshowReducer.slides.map((slide, index) => (
                        <SlideshowSettingsImageRow
                            id={slide.id}
                            key={slide.id}
                            selected={SlideshowControlsReducer.currentSlideIndex === index}
                            src={slide.src}
                            views={slide.views}
                        />
                ))}
            </div>
        </div>
    );
}

// validate that this component is passed the properties it expects
SlideshowSettings.propTypes = propTypes;

// export this redux connected component
export default connect(mapStateToProps, SlideshowSettingsActions)(SlideshowSettings);
