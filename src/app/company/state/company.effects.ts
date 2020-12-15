import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../company.service';
import { startLoading, finishLoading } from 'src/app/shared/state/shared.actions';
import {
    loadCompaniesSuccess,
    CompanyActionType
} from './company.actions';
import Company from '../company.model';

@Injectable()
export class CompanyEffects {

    @Effect() load = this.actions.pipe(
        ofType(CompanyActionType.Load),
        switchMap(() => {
            this.store.dispatch(startLoading());
            return this.service.getAll().pipe(
                switchMap((companies: Company[]) => {
                    this.store.dispatch(finishLoading());
                    return of(loadCompaniesSuccess({ companies }));
                })
            );
        })
    );

    public constructor(
        private actions: Actions,
        private service: CompanyService,
        private store: Store<{}>
    ) { }
}
