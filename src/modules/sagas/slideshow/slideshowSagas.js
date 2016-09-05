/* eslint import/prefer-default-export: 0 */
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { ACTIONS } from 'constants';
import { jsonLoader } from 'utils';

function* fetchJSON(action) {
    try {
        const parsedJSON = yield call(jsonLoader, action.filePath);

        yield put({
            parsedJSON,
            type: ACTIONS.SLIDESHOW_JSON_RECEIVE
        });
    } catch (error) {
        yield put({
            error,
            type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
        });
    }
}

export default function* watchJSONRequest() {
    yield* takeLatest(ACTIONS.SLIDESHOW_JSON_REQUEST, fetchJSON);
}
