import { call, put } from 'redux-saga/effects';
import { expect } from 'chai';
import { ACTIONS } from 'constants';
import { jsonLoader } from 'utils';
import { fetchJSON } from './slideshowSagas';

describe('slideshowSagas', () => {
    it(`Generator \`fetchJSON\` should take action \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` load json file and dispatch \`${ACTIONS.SLIDESHOW_JSON_RECEIVE}\` with valid data`, (done) => {
        const filePath = 'mock.json',
            generator = fetchJSON({
                filePath,
                type: ACTIONS.SLIDESHOW_JSON_REQUEST
            }),
            parsedJSON = { mock: 'mock' };

        let next = generator.next();

        expect(next.value).to.eql(call(jsonLoader, filePath));

        next = generator.next(parsedJSON);

        expect(next.value).to.eql(put({
            parsedJSON,
            type: ACTIONS.SLIDESHOW_JSON_RECEIVE
        }));

        done();
    });

    it(`Generator \`fetchJSON\` should take action \`${ACTIONS.SLIDESHOW_JSON_REQUEST}\` load json file and dispatch \`${ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR}\` with invalid data`, (done) => {
        const filePath = 'mock.json',
            error = 'error',
            generator = fetchJSON({
                filePath,
                type: ACTIONS.SLIDESHOW_JSON_REQUEST
            });

        let next = generator.next();

        expect(next.value).to.eql(call(jsonLoader, filePath));

        next = generator.throw(error);

        expect(next.value).to.eql(put({
            error,
            type: ACTIONS.SLIDESHOW_JSON_RECEIVE_ERROR
        }));

        done();
    });
});
