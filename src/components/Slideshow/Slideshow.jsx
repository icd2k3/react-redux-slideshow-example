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

class Slideshow extends React.Component {

    componentDidMount() {
        if (!this.props.SlideshowReducer.slides) {
            this.props.dispatch(SlideshowActions.requestJSON('src/json/slideshow.json'));
        }
    }

    render() {
        const currentSlideIndex = this.props.SlideshowControlsReducer.currentSlideIndex,
            slide = this.props.SlideshowReducer.slides
                && this.props.SlideshowReducer.slides[currentSlideIndex];

        return (
            <div className={styles.root}>
                <div className={`${styles.content} ${this.props.SlideshowSettingsReducer.toggled ? styles.contentSettingsToggled : ''}`}>
                    <CSSTransitionGroup
                        className={styles.transition}
                        transitionEnterTimeout={450}
                        transitionLeaveTimeout={450}
                        transitionName={
                            `react-css-transition-${this.props.SlideshowSettingsReducer.transition}-${this.props.SlideshowControlsReducer.direction}`
                        }
                    >
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
                    {slide ? <SlideshowControls/> : null}
                    <a
                        className={`${styles.cog} icon-cog`}
                        onClick={this.props.dispatch.bind(this, SlideshowActions.toggleSettings())}
                    />
                  </div>
                <SlideshowSettings/>
            </div>
        );
    }
}

// component expects these props to be provided from parent
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
    dispatch: React.PropTypes.func.isRequired
};

// connects a component to a Redux store
export default connect((state) => {
    return {
        SlideshowControlsReducer: state.SlideshowControlsReducer,
        SlideshowReducer: state.SlideshowReducer,
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    };
})(Slideshow);
