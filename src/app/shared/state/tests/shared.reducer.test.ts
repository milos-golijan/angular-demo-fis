import { Action } from '@ngrx/store';
import { startLoading, finishLoading, SharedActionType } from '../shared.actions';
import { getIsLoading, sharedReducer, SharedState } from '../shared.reducer';

describe('Shared Reducer', () => {

    it('Action startLoading should apply properly', () => {
        let state: SharedState = { inProgress: 0 };
        state = sharedReducer(state, startLoading);
        expect(state.inProgress).toBe(1);
    });

    it('Action finishLoading should apply properly', () => {
        let state: SharedState = { inProgress: 1 };
        state = sharedReducer(state, finishLoading);
        expect(state.inProgress).toBe(0);
    });

    it('Action changeWorkspace should apply properly', () => {
        const mockWorkspace = 'test';
        let state: SharedState = { inProgress: 0 };
        state = sharedReducer(state, {
            type: SharedActionType.ChangeWorkspace,
            workspace: mockWorkspace
        } as Action);
        expect(state.workspace).toBe(mockWorkspace);
    });

    it('Selector getIsLoading should return proper value', () => {
        expect(getIsLoading.projector({ inProgress: 0 })).toBe(false);
        expect(getIsLoading.projector({ inProgress: 1 })).toBe(true);
    });
});
