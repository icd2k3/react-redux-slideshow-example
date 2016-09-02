/**
 * Slide Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Renders a single slide
 */

import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import SlideActions from './SlideActions';

// children components
import SlideInfo from '../SlideInfo/SlideInfo';

// styles specific to this component
import styles from './Slide.css';

const propTypes = {
        SlideshowSettingsReducer: React.PropTypes.shape({
            backgroundSize: React.PropTypes.oneOf(['cover', 'contain'])
        }).isRequired,
        id: React.PropTypes.string.isRequired,
        onSlideView: React.PropTypes.func.isRequired,
        src: React.PropTypes.string.isRequired,
        views: React.PropTypes.number.isRequired
    },
    mapStateToProps = state => ({
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    });

class Slide extends React.Component {

    componentWillMount() {
        this.props.onSlideView(this.props.id);
    }

    render() {
        const inlineStyle = {
            backgroundImage: `url('${this.props.src}')`,
            backgroundSize: this.props.SlideshowSettingsReducer.backgroundSize
        };

        return (
            <div
                className={styles.root}
                style={inlineStyle}
            >
                <SlideInfo
                    views={this.props.views}
                />
            </div>
        );
    }

}

// validate that this component is passed the properties it expects
Slide.propTypes = propTypes;

// export the redux-connected component
export default connect(mapStateToProps, SlideActions)(Slide);
