/**
 * Slide Component
 *
 * type:
 *    Connected container (aware of redux)
 * description:
 *    Renders a single slide
 */

import React from 'react';
import SlideInfo from '../SlideInfo/SlideInfo';
import styles from './Slide.css';

const propTypes = {
    backgroundSize: React.PropTypes.oneOf(['cover', 'contain']).isRequired,
    src: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired
};

function Slide({
    backgroundSize,
    src,
    views
}) {
    const inlineStyle = {
        backgroundImage: `url('${src}')`,
        backgroundSize
    };

    return (
        <div
            className={styles.root}
            style={inlineStyle}
        >
            <SlideInfo
                views={views}
            />
        </div>
    );
}

// validate that this component is passed the properties it expects
Slide.propTypes = propTypes;

// export the presentational component
export default Slide;
