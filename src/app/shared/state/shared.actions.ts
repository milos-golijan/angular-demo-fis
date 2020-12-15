import { createAction, props } from '@ngrx/store';

export enum SharedActionType {
    StartLoading = '[Shared] Start Loading',
    FinishLoading = '[Shared] Finish Loading',
    ChangeWorkspace = '[Shared] Change Workspace'
}

export const startLoading = createAction(SharedActionType.StartLoading);
export const finishLoading = createAction(SharedActionType.FinishLoading);
export const changeWorkspace = createAction(SharedActionType.ChangeWorkspace, props<{ workspace: string }>());
