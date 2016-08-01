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

class Slide extends React.Component {

    componentWillMount() {
        this.props.dispatch(SlideActions.view(this.props.id));
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

// component expects these props to be provided from parent
Slide.propTypes = {
    SlideshowSettingsReducer: React.PropTypes.shape({
        backgroundSize: React.PropTypes.oneOf(['cover', 'contain'])
    }).isRequired,
    dispatch: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired
};

// connects a component to Redux store so we can use dispatcher
export default connect((state) => {
    return {
        SlideshowSettingsReducer: state.SlideshowSettingsReducer
    };
})(Slide);
