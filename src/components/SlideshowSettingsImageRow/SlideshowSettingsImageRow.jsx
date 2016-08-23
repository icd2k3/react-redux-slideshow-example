/**
 * Slide Info Component
 *
 * type:
 *    Presentational (not aware of redux)
 * description:
 *    Renders a row with a thumbnail of a slide
 *    including data regarding views, src path, and id
 */

import React from 'react';

// styles specific to this component
import styles from './SlideshowSettingsImageRow.css';

const SlideshowSettingsImageRow = (props) => (
    <div className={styles.root}>
        <div
            className={`${styles.thumbnail} ${props.selected ? styles.thumbnailSelected : ''}`}
            style={{ backgroundImage: `url('${props.src}')` }}
        />
        <ul className={styles.info}>
            <li><strong>ID</strong><span>{props.id}</span></li>
            <li><strong>SRC</strong><span>{props.src}</span></li>
            <li><strong>VIEWS</strong><span>{props.views}</span></li>
        </ul>
    </div>
);

// validate that this component is passed the properties it expects
SlideshowSettingsImageRow.propTypes = {
    id: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    src: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired
};

// export the presentational component
export default SlideshowSettingsImageRow;
