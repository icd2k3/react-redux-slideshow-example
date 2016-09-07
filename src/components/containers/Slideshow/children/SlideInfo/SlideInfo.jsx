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

const propTypes = {
  views: React.PropTypes.number.isRequired
};

// component jsx markup
function SlideInfo({ views }) {
  return (
    <div className={styles.root}>
      <i className="icon-eye" /> <span>{views} VIEWS</span>
    </div>
  );
}

// validate that this component is passed the properties it expects
SlideInfo.propTypes = propTypes;

// export the presentational component
export default SlideInfo;
