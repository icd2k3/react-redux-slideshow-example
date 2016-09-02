/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// app data
import store from './redux/store';

// children
import Slideshow from './components/Slideshow/Slideshow';

// root styles
import './index.css';

class Index extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Slideshow />
            </Provider>
        );
    }
}

Index.propTypes = {
    store: React.PropTypes.object.isRequired
};

Index.defaultProps = {
    store
};

ReactDOM.render(<Index />, document.getElementById('app'));
