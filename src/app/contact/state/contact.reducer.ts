import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as actions from './contact.actions';
import Contact from '../contact.model';

export type ContactState = {
    edited?: Contact,
    contacts: Contact[],
    formComplete?: boolean,
    formError?: string
};

const initialState: ContactState = {
    contacts: [],
    formComplete: false
};

const getContactsFeatureState = createFeatureSelector<ContactState>('contact');

export const getContacts = createSelector(
    getContactsFeatureState,
    state => state.contacts
);

export const getEditedContact = createSelector(
    getContactsFeatureState,
    state => state.edited
);

export const getFormComplete = createSelector(
    getContactsFeatureState,
    state => state.formComplete
);

export const getFormError = createSelector(
    getContactsFeatureState,
    state => state.formError
);

export const contactReducer = createReducer<ContactState>(
    initialState,
    on(actions.loadContactsSuccess, (state: ContactState, action) => {
        return {
            ...state,
            contacts: action.contacts
        };
    }),
    on(actions.addContactSuccess, (state: ContactState, action) => {
        return {
            ...state,
            contacts: [...state.contacts, action.contact]
        };
    }),
    on(actions.updateContactSuccess, (state: ContactState, action) => {
        const index: number = state.contacts.findIndex((contact: Contact) =>
                contact.id === action.contact.id);
        const contacts: Contact[] = state.contacts.filter((contact: Contact) =>
            contact.id !== action.contact.id);
        contacts.splice(index, 0, action.contact);
        return {
            ...state,
            edited: null,
            contacts
        };
    }),
    on(actions.deleteContactSuccess, (state: ContactState, action) => {
        return {
            ...state,
            contacts: state.contacts.filter((contact: Contact) =>
                contact.id !== action.id
            )
        };
    }),
    on(actions.startEditContact, (state: ContactState, action) => {
        const filtered: Contact[] = state.contacts.filter((contact: Contact) =>
                contact.id === action.id);
        return {
            ...state,
            edited: (filtered.length > 0) ? filtered[0] : null
        };
    }),
    on(actions.contactFormComplete, (state: ContactState) => {
        return {
            ...state,
            formComplete: true,
            formError: null
        };
    }),
    on(actions.contactFormRestart, (state: ContactState) => {
        return {
            ...state,
            formComplete: false,
            formError: null
        };
    }),
    on(actions.contactFormError, (state: ContactState, action: any) => {
        return {
            ...state,
            formComplete: false,
            formError: action.error
        };
    })
);
