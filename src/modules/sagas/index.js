import { fork } from 'redux-saga/effects';
import slideshowSagas from './slideshow/slideshowSagas';

export default function* root() {
    yield [
        fork(slideshowSagas)
    ];
}
