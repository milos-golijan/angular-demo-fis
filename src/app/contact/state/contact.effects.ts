import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { switchMap, zip, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactService } from '../contact.service';
import { startLoading, finishLoading } from 'src/app/shared/state/shared.actions';
import {
    addContactSuccess,
    loadContactsSuccess,
    updateContactSuccess,
    deleteContactSuccess,
    contactFormComplete,
    ContactActionType,
    contactFormError,
} from './contact.actions';
import Contact from '../contact.model';

@Injectable()
export class ContactEffects {

    @Effect() add = this.actions.pipe(
        ofType(ContactActionType.Add),
        switchMap((action: any) => {
            this.store.dispatch(startLoading());
            return this.service.create(action.contact as Contact).pipe(
                catchError(error => {
                    this.store.dispatch(finishLoading());
                    return of(contactFormError({ error }));
                }),
                switchMap((contact: Contact) => {
                    this.store.dispatch(finishLoading());
                    this.store.dispatch(contactFormComplete());
                    return of(addContactSuccess({ contact }));
                })
            );
        })
    );

    @Effect() load = this.actions.pipe(
        ofType(ContactActionType.Load),
        switchMap((action: any) => {
            this.store.dispatch(startLoading());
            return this.service.getAll().pipe(
                switchMap((contacts: Contact[]) => {
                    this.store.dispatch(finishLoading());
                    return of(loadContactsSuccess({ contacts }));
                })
            );
        })
    );

    @Effect() update = this.actions.pipe(
        ofType(ContactActionType.Update),
        switchMap((action: any) => {
            this.store.dispatch(startLoading());
            return this.service.update(action.contact).pipe(
                catchError(error => {
                    this.store.dispatch(finishLoading());
                    return of(contactFormError({ error }));
                }),
                switchMap(() => {
                    this.store.dispatch(finishLoading());
                    this.store.dispatch(contactFormComplete());
                    return of(updateContactSuccess({ contact: action.contact }));
                })
            );
        })
    );

    @Effect() delete = this.actions.pipe(
        ofType(ContactActionType.Delete),
        switchMap((action: any) => {
            this.store.dispatch(startLoading());
            return this.service.delete(action.id).pipe(
                switchMap(() => {
                    this.store.dispatch(finishLoading());
                    return of(deleteContactSuccess({ id: action.id }));
                })
            );
        })
    );

    public constructor(
        private actions: Actions,
        private service: ContactService,
        private store: Store<{}>
    ) { }
}
