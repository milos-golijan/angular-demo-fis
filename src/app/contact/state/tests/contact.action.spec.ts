import {
    addContact,
    addContactSuccess,
    loadContacts,
    loadContactsSuccess,
    updateContact,
    updateContactSuccess,
    deleteContact,
    deleteContactSuccess,
    startEditContact,
    contactFormComplete,
    contactFormRestart,
    contactFormError,
    ContactActionType
} from '../contact.actions';

describe('Shared Actions', () => {

    it('Action startLoading should have proper type', () => {
        const action = addContact;
        expect(action.type).toBe(ContactActionType.Add);
    });

    it('Action finishLoading should have proper type', () => {
        const action = addContactSuccess;
        expect(action.type).toBe(ContactActionType.AddSuccess);
    });

    it('Action loadContacts should have proper type', () => {
        const action = loadContacts;
        expect(action.type).toBe(ContactActionType.Load);
    });

    it('Action loadContactsSuccess should have proper type', () => {
        const action = loadContactsSuccess;
        expect(action.type).toBe(ContactActionType.LoadSuccess);
    });

    it('Action updateContact should have proper type', () => {
        const action = updateContact;
        expect(action.type).toBe(ContactActionType.Update);
    });

    it('Action updateContactSuccess should have proper type', () => {
        const action = updateContactSuccess;
        expect(action.type).toBe(ContactActionType.UpdateSuccess);
    });

    it('Action deleteContact should have proper type', () => {
        const action = deleteContact;
        expect(action.type).toBe(ContactActionType.Delete);
    });

    it('Action deleteContactSuccess should have proper type', () => {
        const action = deleteContactSuccess;
        expect(action.type).toBe(ContactActionType.DeleteSuccess);
    });

    it('Action startEditContact should have proper type', () => {
        const action = startEditContact;
        expect(action.type).toBe(ContactActionType.StartEdit);
    });

    it('Action contactFormComplete should have proper type', () => {
        const action = contactFormComplete;
        expect(action.type).toBe(ContactActionType.FormComplete);
    });

    it('Action contactFormRestart should have proper type', () => {
        const action = contactFormRestart;
        expect(action.type).toBe(ContactActionType.FormRestart);
    });

    it('Action contactFormError should have proper type', () => {
        const action = contactFormError;
        expect(action.type).toBe(ContactActionType.FormError);
    });
});
