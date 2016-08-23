/**
 * Slide Info Component
 *
 * type:
 *    Presentational (not aware of redux)
 * description:
 *    Renders a simple views label with count
 */

import React from 'react';

// styles specific to this component
import styles from './SlideInfo.css';

// component jsx markup
const SlideInfo = (props) => (
    <div className={styles.root}>
        <i className="icon-eye" /> <span>{props.views} VIEWS</span>
    </div>
);

// validate that this component is passed the properties it expects
SlideInfo.propTypes = {
    views: React.PropTypes.number.isRequired
};

// export the presentational component
export default SlideInfo;
