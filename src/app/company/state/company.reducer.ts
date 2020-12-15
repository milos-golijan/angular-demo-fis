import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as actions from './company.actions';
import Company from '../company.model';

export type CompanyState = {
    companies: Company[]
};

const initialState: CompanyState = {
    companies: []
};

const getCompaniesFeatureState = createFeatureSelector<CompanyState>('company');

export const getCompanies = createSelector(
    getCompaniesFeatureState,
    state => state.companies
);

export const companyReducer = createReducer<CompanyState>(
    initialState,
    on(actions.loadCompaniesSuccess, (state: CompanyState, action) => {
        return {
            ...state,
            companies: action.companies
        };
    })
);
