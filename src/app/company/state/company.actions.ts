import { createAction, props } from '@ngrx/store';
import Company from '../company.model';

export enum CompanyActionType {
    Load = '[Company] Load',
    LoadSuccess = '[Company] Load Success'
}

export const loadCompanies = createAction(CompanyActionType.Load);
export const loadCompaniesSuccess = createAction(CompanyActionType.LoadSuccess, props<{ companies: Company[] }>());
