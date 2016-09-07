import { fork } from 'redux-saga/effects';
import { watchJSONRequest } from './slideshow/slideshowSagas';

export default function* root() {
  yield [
    fork(watchJSONRequest)
  ];
}
