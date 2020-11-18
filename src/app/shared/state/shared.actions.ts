import { createAction } from '@ngrx/store';

export enum SharedActionType {
    StartLoading = '[Shared] Start Loading',
    FinishLoading = '[Shared] Finish Loading',
}

export const startLoading = createAction(SharedActionType.StartLoading);
export const finishLoading = createAction(SharedActionType.FinishLoading);
