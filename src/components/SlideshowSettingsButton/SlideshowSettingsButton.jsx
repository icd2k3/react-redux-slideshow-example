/**
 * Slideshow Settings Button Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Simple icon button for toggling settings panel
 *    on and off
 */

import React from 'react';
import {
    connect
} from 'react-redux';

// actions this view can dispatch
import * as SlideshowSettingsButtonActions from './SlideshowSettingsButtonActions.js';

// styles specific to this component
import styles from './SlideshowSettingsButton.css';

const

    // component jsx markup
    SlideshowSettingsButton = (props) => (
        <a
            className={`${styles.root} icon-cog`}
            onClick={props.actions.onClick}
        />
    ),

    // takes redux state as an input and remaps it to props for this component
    mapStateToProps = () => ({}),

    // takes redux dispatch function as an input and remaps it to props for this component
    mapDispatchToProps = (dispatch) => ({
        actions: {
            onClick: () => {
                dispatch(SlideshowSettingsButtonActions.toggleSettings());
            }
        }
    });

// validate that this component is passed the properties it expects
SlideshowSettingsButton.propTypes = {
    actions: React.PropTypes.shape({
        onClick: React.PropTypes.func.isRequired
    }).isRequired
};

// export the redux-connected component
export default connect(mapStateToProps, mapDispatchToProps)(SlideshowSettingsButton);
