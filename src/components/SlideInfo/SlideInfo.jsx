import React from 'react';

// styles specific to this component
import styles from './SlideInfo.css';

export default class SlideInfo extends React.Component {

    render() {
        return (
            <div className={styles.root}>
                <i className="icon-eye"/> <span>{this.props.views} VIEWS</span>
            </div>
        );
    }
}

// component expects these props to be provided from parent
SlideInfo.propTypes = {
    views: React.PropTypes.number.isRequired
};
