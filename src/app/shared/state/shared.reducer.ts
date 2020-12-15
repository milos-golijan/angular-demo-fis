import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as actions from './shared.actions';

export type SharedState = {
    inProgress: number,
    workspace?: string,
};

const initialState: SharedState = {
    inProgress: 0,
    workspace: 'workspace1'
};

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getIsLoading = createSelector(
    getSharedFeatureState,
    state => state.inProgress > 0
);

export const getWorkspace = createSelector(
    getSharedFeatureState,
    state => state.workspace
);

export const sharedReducer = createReducer<SharedState>(
    initialState,
    on(actions.startLoading, (state: SharedState, action) => {
        return {
            ...state,
            inProgress: state.inProgress + 1
        };
    }),
    on(actions.finishLoading, (state: SharedState, action) => {
        return {
            ...state,
            inProgress: state.inProgress - 1
        };
    }),
    on(actions.changeWorkspace, (state: SharedState, action) => {
        return {
            ...state,
            workspace: action.workspace
        };
    })
);
