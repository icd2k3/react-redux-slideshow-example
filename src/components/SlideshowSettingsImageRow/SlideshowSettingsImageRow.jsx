import React from 'react';

// styles specific to this component
import styles from './SlideshowSettingsImageRow.css';

export default class SlideshowSettingsImageRow extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <div
                    className={`${styles.thumbnail} ${this.props.selected ? styles.thumbnailSelected : ''}`}
                    style={{backgroundImage: `url('${this.props.src}')`}}
                />
                <ul className={styles.info}>
                    <li><strong>ID</strong><span>{this.props.id}</span></li>
                    <li><strong>SRC</strong><span>{this.props.src}</span></li>
                    <li><strong>VIEWS</strong><span>{this.props.views}</span></li>
                </ul>
            </div>
        );
    }
}

SlideshowSettingsImageRow.propTypes = {
    id: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    src: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired
};
