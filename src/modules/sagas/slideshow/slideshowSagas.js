/* eslint import/prefer-default-export: 0 */
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { ACTIONS } from 'constants';
import {
    receiveJSON,
    receiveJSONError
} from 'actions/slideshow/slideshowActions';
import { jsonLoader } from 'utils';

export function* fetchJSON(action) {
  try {
    const parsedJSON = yield call(jsonLoader, action.filePath);

    yield put(receiveJSON(parsedJSON));
  } catch (error) {
    yield put(receiveJSONError(error));
  }
}

export function* watchJSONRequest() {
  yield* takeLatest(ACTIONS.SLIDESHOW_JSON_REQUEST, fetchJSON);
}
