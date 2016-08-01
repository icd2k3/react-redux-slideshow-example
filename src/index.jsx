import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// app data
import store from './store/store.js';

// children
import Slideshow from './components/Slideshow/Slideshow.jsx';

// root styles
import './index.css';

class Index extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Slideshow/>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'));
