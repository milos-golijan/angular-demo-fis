import {
    startLoading,
    finishLoading,
    changeWorkspace,
    SharedActionType
} from '../shared.actions';

describe('Shared Actions', () => {

    it('Action startLoading should have proper type', () => {
        const action = startLoading;
        expect(action.type).toBe(SharedActionType.StartLoading);
    });

    it('Action finishLoading should have proper type', () => {
        const action = finishLoading;
        expect(action.type).toBe(SharedActionType.FinishLoading);
    });

    it('Action changeWorkspace should have proper type', () => {
        const action = changeWorkspace;
        expect(action.type).toBe(SharedActionType.ChangeWorkspace);
    });
});
