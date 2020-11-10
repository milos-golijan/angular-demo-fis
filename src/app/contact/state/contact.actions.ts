import { createAction, props } from '@ngrx/store';
import Contact from '../contact.model';

export enum ContactActionType {
    Add = '[Contact] Add',
    AddSuccess = '[Contact] Add Success',

    Load = '[Contact] Load',
    LoadSuccess = '[Contact] Load Success',

    Update = '[Contact] Update',
    UpdateSuccess = '[Contact] Update Success',

    Delete = '[Contact] Delete',
    DeleteSuccess = '[Contact] Delete Success',

    StartEdit = '[Contact] Start Edit',

    FormComplete = '[Contact] Form Complete',
    FormRestart = '[Contact] Form Restart',
    FormError = '[Contact] Form Error'
}

export const addContact = createAction(ContactActionType.Add, props<{ contact: Contact }>());
export const addContactSuccess = createAction(ContactActionType.AddSuccess, props<{ contact: Contact }>());

export const loadContacts = createAction(ContactActionType.Load);
export const loadContactsSuccess = createAction(ContactActionType.LoadSuccess, props<{ contacts: Contact[] }>());

export const updateContact = createAction(ContactActionType.Update, props<{ contact: Contact }>());
export const updateContactSuccess = createAction(ContactActionType.UpdateSuccess, props<{ contact: Contact }>());

export const deleteContact = createAction(ContactActionType.Delete, props<{ id: string }>());
export const deleteContactSuccess = createAction(ContactActionType.DeleteSuccess, props<{ id: string }>());

export const startEditContact = createAction(ContactActionType.StartEdit, props<{ id: string }>());

export const contactFormComplete = createAction(ContactActionType.FormComplete);
export const contactFormRestart = createAction(ContactActionType.FormRestart);
export const contactFormError = createAction(ContactActionType.FormError, props<{ error: string }>());
