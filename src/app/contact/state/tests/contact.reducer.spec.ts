import { Action } from '@ngrx/store';
import { Deserialize } from 'cerialize';
import {
    genArray,
    genContactData
} from 'src/app/test/test-data';
import Contact from '../../contact.model';
import {
    contactFormComplete,
    contactFormRestart,
    ContactActionType
} from '../contact.actions';
import {
    getContacts,
    getEditedContact,
    getFormComplete,
    getFormError,
    contactReducer,
    ContactState
} from '../contact.reducer';

describe('Contact Reducer', () => {

    const initialState = {
        contacts: [],
        formComplete: false
    };
    const mockContacts = Deserialize(genArray(genContactData), Contact);
    const mockContact = mockContacts[0];

    it('Action addContactSuccess should apply properly', () => {
        let state: ContactState = { ...initialState };
        state = contactReducer(state, {
            type: ContactActionType.AddSuccess,
            contact: mockContact
        } as Action);
        expect(state.contacts).toEqual([mockContact]);
    });

    it('Action loadContactsSuccess should apply properly', () => {
        let state: ContactState = { ...initialState };
        state = contactReducer(state, {
            type: ContactActionType.LoadSuccess,
            contacts: mockContacts
        } as Action);
        expect(state.contacts).toEqual(mockContacts);
    });

    it('Action updateContactSuccess should apply properly', () => {
        let state: ContactState = { ...initialState, contacts: [mockContact] };
        const mockName = 'test';
        const changedMockContact = { ...mockContact, firstName: mockName };
        state = contactReducer(state, {
            type: ContactActionType.UpdateSuccess,
            contact: changedMockContact
        } as Action);
        expect(state.contacts[0].firstName).toEqual(mockName);
    });

    it('Action deleteContactSuccess should apply properly', () => {
        let state: ContactState = { ...initialState, contacts: [ ...mockContacts ] };
        state = contactReducer(state, {
            type: ContactActionType.DeleteSuccess,
            id: mockContact.id
        } as Action);
        expect(state.contacts).toEqual(mockContacts.filter((contact: Contact) =>
            contact.id !== mockContact.id
        ));
    });

    it('Action startEditContact should apply properly', () => {
        let state: ContactState = { ...initialState, contacts: mockContacts };
        state = contactReducer(state, {
            type: ContactActionType.StartEdit,
            id: mockContact.id
        } as Action);
        expect(state.edited).toEqual(mockContact);
    });

    it('Action startEditContact should apply properly on wrong id', () => {
        let state: ContactState = { ...initialState, contacts: mockContacts };
        state = contactReducer(state, {
            type: ContactActionType.StartEdit,
            id: '123'
        } as Action);
        expect(state.edited).toEqual(null);
    });

    it('Action contactFormComplete should apply properly', () => {
        let state: ContactState = { ...initialState };
        state = contactReducer(state, contactFormComplete);
        expect(state.formComplete).toBe(true);
    });

    it('Action contactFormRestart should apply properly', () => {
        let state: ContactState = { ...initialState };
        state = contactReducer(state, contactFormRestart);
        expect(state.formComplete).toBe(false);
        expect(state.formError).toBe(null);
    });

    it('Action contactFormRestart should apply properly', () => {
        let state: ContactState = { ...initialState, formComplete: true };
        state = contactReducer(state, contactFormRestart);
        expect(state.formComplete).toBe(false);
        expect(state.formError).toBe(null);
    });

    it('Action contactFormError should apply properly', () => {
        let state: ContactState = { ...initialState };
        const mockError = 'error';
        state = contactReducer(state, {
            type: ContactActionType.FormError,
            error: mockError
        } as Action);
        expect(state.formComplete).toBe(false);
        expect(state.formError).toBe(mockError);
    });

    it('Selector getContacts should return proper value', () => {
        expect(getContacts.projector({ contacts: mockContacts })).toBe(mockContacts);
    });

    it('Selector getEditedContact should return proper value', () => {
        expect(getEditedContact.projector({ edited: mockContact })).toBe(mockContact);
    });

    it('Selector getFormComplete should return proper value', () => {
        expect(getFormComplete.projector({ formComplete: true })).toBe(true);
    });

    it('Selector getFormError should return proper value', () => {
        const mockError = 'error';
        expect(getFormError.projector({ formError: mockError })).toBe(mockError);
    });
});
