import { expect } from 'chai';
import * as utils from 'utils';

describe('utils', () => {
  it('Should contain `generateId` method', (done) => {
    expect(utils.generateId).to.be.a.function;

    utils.generateId();

    done();
  });

  it('Should be able to run the `jsonLoader` method successfully', (done) => {
    expect(utils.jsonLoader).to.be.a.function;

    utils.jsonLoader('src/static/json/slideshow.json')
            .then((response) => {
              expect(response).to.be.ok;
              done();
            });
  });

  it('Should be able to run the `jsonLoader` with invalid json and have it return the correct error', (done) => {
    utils.jsonLoader('src/static/json/mock-invalid.json')
            .catch((err) => {
              expect(err.toString()).to.deep.equal(new Error('Could not parse JSON data').toString());
              done();
            });
  });

  it('Should be able to run the `jsonLoader` with invalid json path and have it return the correct error', (done) => {
    utils.jsonLoader('mock.json')
            .catch((err) => {
              expect(err.toString()).to.deep.equal(new Error('Not Found').toString());
              done();
            });
  });
});
