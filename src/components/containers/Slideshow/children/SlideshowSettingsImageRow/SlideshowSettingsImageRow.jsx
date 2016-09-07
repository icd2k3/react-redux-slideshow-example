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
import styles from './SlideshowSettingsImageRow.css';

const propTypes = {
  id: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  src: React.PropTypes.string.isRequired,
  views: React.PropTypes.number.isRequired
};

function SlideshowSettingsImageRow({
  id,
  selected,
  src,
  views
}) {
  return (
    <div className={styles.root}>
      <div
        className={`${styles.thumbnail} ${selected ? styles.thumbnailSelected : ''}`}
        style={{ backgroundImage: `url('${src}')` }}
      />
      <ul className={styles.info}>
        <li><strong>ID</strong><span>{id}</span></li>
        <li><strong>SRC</strong><span>{src}</span></li>
        <li><strong>VIEWS</strong><span>{views}</span></li>
      </ul>
    </div>
  );
}

// validate that this component is passed the properties it expects
SlideshowSettingsImageRow.propTypes = propTypes;

// export the presentational component
export default SlideshowSettingsImageRow;
