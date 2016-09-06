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
import { connect } from 'react-redux';
import { toggleSettings } from 'actions/slideshow/slideshowActions';
import styles from './SlideshowSettingsButton.css';

const propTypes = {
        actions: React.PropTypes.shape({
            onClick: React.PropTypes.func.isRequired
        }).isRequired
    },
    // actions that this view can dispatch/trigger
    mapDispatchToProps = dispatch => ({
        actions: {
            onClick: () => dispatch(
                toggleSettings()
            )
        }
    });

function SlideshowSettingsButton({
    actions
}) {
    return (
        <a
            className={`${styles.root} icon-cog`}
            onClick={actions.onClick}
        />
    );
}

// validate that this component is passed the properties it expects
SlideshowSettingsButton.propTypes = propTypes;

// export the redux-connected component
export default connect(null, mapDispatchToProps)(SlideshowSettingsButton);
