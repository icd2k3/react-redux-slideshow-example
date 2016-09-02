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
    currentSlideIndex: React.PropTypes.number.isRequired,
    enabled: React.PropTypes.bool,
    onChangeBackgroundSize: React.PropTypes.func.isRequired,
    onChangeTransition: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    slides: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        src: React.PropTypes.string.isRequired,
        views: React.PropTypes.number.isRequired
    }))
};

class SlideshowSettings extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.enabled || nextProps.enabled;
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.inner}>
                    <i
                        className={`${styles.close} icon-cross`}
                        onClick={this.props.onToggle}
                    />
                    <h1>Settings</h1>
                    <label htmlFor="selectTransition">Transition</label>
                    <select
                        id="selectTransition"
                        onChange={(e) => this.props.onChangeTransition(e.target.value)}
                    >
                        <option value="slide">Slide</option>
                        <option value="fade">Fade</option>
                    </select>
                    <label htmlFor="selectBackgroundSize">Background Size</label>
                    <select
                        id="selectBackgroundSize"
                        onChange={(e) => this.props.onChangeBackgroundSize(e.target.value)}
                    >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                    </select>
                    <label htmlFor="imageDataList">Image Data</label>
                    {this.props.slides
                        && this.props.slides.map((slide, index) => (
                            <SlideshowSettingsImageRow
                                id={slide.id}
                                key={slide.id}
                                selected={this.props.currentSlideIndex === index}
                                src={slide.src}
                                views={slide.views}
                            />
                    ))}
                </div>
            </div>
        );
    }
}

// validate that this component is passed the properties it expects
SlideshowSettings.propTypes = propTypes;

// export this redux connected component
export default connect(null, SlideshowSettingsActions)(SlideshowSettings);
