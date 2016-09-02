import { expect } from 'chai';
import { mockStore } from 'testUtils';
import exceptionReporter from '../exceptionReporter';

describe('exceptionReporter', () => {
    it('Should be a function and validate actions being passed through it', (done) => {
        expect(exceptionReporter).to.be.a.function;
        expect(exceptionReporter(mockStore())(() => {})()).to.not.be.ok;

        done();
    });
});
