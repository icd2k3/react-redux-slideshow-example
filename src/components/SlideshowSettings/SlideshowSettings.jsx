import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import * as SlideshowSettingsActions from './SlideshowSettingsActions.js';

// child components
import SlideshowSettingsImageRow from '../SlideshowSettingsImageRow/SlideshowSettingsImageRow.jsx';

// styles specific to this component
import styles from './SlideshowSettings.css';

class SlideshowSettings extends React.Component {

    onChangeTransition(e) {
        this.props.dispatch(SlideshowSettingsActions.changeTransition(e.currentTarget.value));
    }

    onChangeBackgroundSize(e) {
        this.props.dispatch(SlideshowSettingsActions.changeBackgroundSize(e.currentTarget.value));
    }

    render() {
        const SlideshowControlsReducer = this.props.SlideshowControlsReducer;

        return (
            <div className={styles.root}>
                <div className={styles.inner}>
                    <i
                        className={`${styles.close} icon-cross`}
                        onClick={this.props.dispatch.bind(this, SlideshowSettingsActions.toggle())}
                    />
                    <h1>Settings</h1>
                    <label>Transition</label>
                    <select onChange={this.onChangeTransition.bind(this)}>
                        <option value="slide">Slide</option>
                        <option value="fade">Fade</option>
                    </select>
                    <label>Background Size</label>
                    <select onChange={this.onChangeBackgroundSize.bind(this)}>
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                    </select>
                    <label>Image Data</label>
                    {this.props.SlideshowReducer.slides && this.props.SlideshowReducer.slides.map((slide, index) => {
                        return (
                            <SlideshowSettingsImageRow
                                id={slide.id}
                                key={slide.id}
                                selected={SlideshowControlsReducer.currentSlideIndex === index}
                                src={slide.src}
                                views={slide.views}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

// component expects these props to be provided from parent
SlideshowSettings.propTypes = {
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
    dispatch: React.PropTypes.func.isRequired
};

// connects a component to Redux store so we can use dispatcher
export default connect((state) => {
    return {
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer
    };
})(SlideshowSettings);
