import { expect } from 'chai';
import deepSortObject from 'deep-sort-object';
import outdent from 'outdent';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const reduxMockStore = configureStore([thunk]);

export function mockStore(opts) {
    const defaults = {
            done: null,
            expectedActions: [],
            state: {}
        },
        mergedOpts = Object.assign({}, defaults, opts),
        storeMock = reduxMockStore(mergedOpts.state, mergedOpts.expectedActions, mergedOpts.done);

    storeMock.testExpectedActions = () => {
        const expectedActions = mergedOpts.expectedActions,
            actualActions = storeMock.getActions();

        return expect(
            expectedActions,
            outdent`
            ----------------------------------
            expectedActions should equal actualActions:
            ==================
             EXPECTED ACTIONS
            ==================
            ${JSON.stringify(deepSortObject(expectedActions), null, 4)}
            ==================
              ACTUAL ACTIONS
            ==================
            ${JSON.stringify(deepSortObject(actualActions), null, 4)}
            ----------------------------------
            `
        ).to.deep.eql(actualActions);
    };

    return storeMock;
}

export function reducerActionHandler(opts) {
    const defaults = {
            action: {},
            expectedState: {},
            reducer: null,
            state: {}
        },
        mergedOpts = Object.assign({}, defaults, opts),
        newState = mergedOpts.reducer(mergedOpts.state, mergedOpts.action);

    return expect(
        JSON.stringify(deepSortObject(newState)),
        outdent`
        New state did not match expected state:
        =========
        NEW STATE
        =========
        ${JSON.stringify(deepSortObject(newState), null, 4)}
        ==============
        EXPECTED STATE
        ==============
        ${JSON.stringify(deepSortObject(mergedOpts.expectedState), null, 4)}
        ===============
        FLAT COMPARISON
        ===============
        ${JSON.stringify(deepSortObject(newState))}
        ---------------
        ${JSON.stringify(deepSortObject(mergedOpts.expectedState))}
        ---------------
    `).to.deep.eql(JSON.stringify(deepSortObject(mergedOpts.expectedState)));
}

export function emptyFunction() {}
