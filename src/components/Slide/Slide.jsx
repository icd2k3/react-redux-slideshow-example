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
import * as SlideActions from './SlideActions.js';

// children components
import SlideInfo from '../SlideInfo/SlideInfo.jsx';

// styles specific to this component
import styles from './Slide.css';

// COMPONENT ///////////////////////////////////////
class Slide extends React.Component {

    componentWillMount() {
        this.props.actions.onSlideView(this.props.id);
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

// MAP PROPS ///////////////////////////////////////
const

    // takes redux state as an input and remaps it to this.props for this component
    mapStateToProps = (state) => ({
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    }),

    // takes redux dispatch function as an input and remaps it to this.props for this component
    mapDispatchToProps = (dispatch) => ({
        actions: {
            onSlideView: (id) => {
                dispatch(SlideActions.view(id));
            }
        }
    });

// VALIDATE PROPS //////////////////////////////////
Slide.propTypes = {
    SlideshowSettingsReducer: React.PropTypes.shape({
        backgroundSize: React.PropTypes.oneOf(['cover', 'contain'])
    }).isRequired,
    actions: React.PropTypes.shape({
        onSlideView: React.PropTypes.func.isRequired
    }).isRequired,
    id: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired
};

// EXPORT //////////////////////////////////////////
export default connect(mapStateToProps, mapDispatchToProps)(Slide);
