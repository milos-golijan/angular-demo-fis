import { Observable, of, throwError } from "rxjs";
import { Deserialize } from 'cerialize';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ContactState } from '../contact.reducer';
import { ContactEffects } from '../contact.effects';
import { ContactActionType, contactFormComplete } from '../contact.actions';
import { ContactService } from '../../contact.service';
import { genArray, genContactData } from 'src/app/test/test-data';
import Contact from '../../contact.model';
import { finishLoading } from 'src/app/shared/state/shared.actions';

const TEST_ERROR = 'test';

class ContactServiceStub {

    public getAll(): Observable<Contact[]> {
        return of([]);
    }

    public create(contact: Contact): Observable<any> {
        return of({});
    }

    public update(updatedContact: Contact): Observable<any> {
        return of({});
    }

    public delete(contactId: string): Observable<any> {
        return of({});
    }
}

describe('ContactService', () => {

    let actions$: Observable<any>;
    let effects: ContactEffects;
    let store: MockStore<ContactState>;
    let contactServiceMock: ContactServiceStub;

    const initialState = {
        contact: {
            contacts: Deserialize(genArray(genContactData), Contact),
            formComplete: false
        }
    };

    beforeEach(() => {
        contactServiceMock = new ContactServiceStub();

        TestBed.configureTestingModule({
            providers: [
                ContactEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: ContactService, useValue: contactServiceMock },
            ],
        });

        effects = TestBed.inject(ContactEffects);
        store = TestBed.inject(MockStore);
    });

    it('Should create effects', () => {
        expect(effects).toBeTruthy();
    });

    it('Should dispatch AddSuccess on successfull Add', (done) => {
        spyOn(store, 'dispatch');
        const mockContact: Contact = Deserialize(genContactData(), Contact);
        spyOn(contactServiceMock, 'create').and.returnValue(of(mockContact));
        actions$ = of({
            type: ContactActionType.Add,
            contact: mockContact
        });
        effects.add.subscribe((action) => {
            expect(action).toEqual({
                contact: mockContact,
                type: ContactActionType.AddSuccess
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            expect(store.dispatch).toHaveBeenCalledWith(contactFormComplete());
            done();
        });
    });

    it('Should dispatch FormError on unsuccessfull Add', (done) => {
        spyOn(store, 'dispatch');
        const mockContact: Contact = Deserialize(genContactData(), Contact);
        spyOn(contactServiceMock, 'create').and.returnValue(throwError(TEST_ERROR));
        actions$ = of({
            type: ContactActionType.Add,
            contact: mockContact
        });
        effects.add.subscribe((action) => {
            expect(action).toEqual({
                error: TEST_ERROR,
                type: ContactActionType.FormError
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            done();
        });
    });

    it('Should dispatch LoadSuccess on successfull Load', (done) => {
        spyOn(store, 'dispatch');
        const mockContacts: Contact[] = Deserialize(genArray(genContactData), Contact);
        spyOn(contactServiceMock, 'getAll').and.returnValue(of(mockContacts));
        actions$ = of({
            type: ContactActionType.Load
        });
        effects.load.subscribe((action) => {
            expect(action).toEqual({
                contacts: mockContacts,
                type: ContactActionType.LoadSuccess
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            done();
        });
    });

    it('Should dispatch UpdateSuccess on successfull Update', (done) => {
        spyOn(store, 'dispatch');
        const mockContact: Contact = Deserialize(genContactData(), Contact);
        spyOn(contactServiceMock, 'update').and.returnValue(of(mockContact));
        actions$ = of({
            type: ContactActionType.Update,
            contact: mockContact
        });
        effects.update.subscribe((action) => {
            expect(action).toEqual({
                contact: mockContact,
                type: ContactActionType.UpdateSuccess
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            expect(store.dispatch).toHaveBeenCalledWith(contactFormComplete());
            done();
        });
    });

    it('Should dispatch FormError on unsuccessfull Update', (done) => {
        spyOn(store, 'dispatch');
        const mockContact: Contact = Deserialize(genContactData(), Contact);
        spyOn(contactServiceMock, 'update').and.returnValue(throwError(TEST_ERROR));
        actions$ = of({
            type: ContactActionType.Update,
            contact: mockContact
        });
        effects.update.subscribe((action) => {
            expect(action).toEqual({
                error: TEST_ERROR,
                type: ContactActionType.FormError
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            done();
        });
    });

    it('Should dispatch DeleteSuccess on successfull Delete', (done) => {
        spyOn(store, 'dispatch');
        const mockContact: Contact = Deserialize(genContactData(), Contact);
        spyOn(contactServiceMock, 'delete').and.returnValue(of(mockContact.id));
        actions$ = of({
            type: ContactActionType.Delete,
            id: mockContact.id
        });
        effects.delete.subscribe((action) => {
            expect(action).toEqual({
                id: mockContact.id,
                type: ContactActionType.DeleteSuccess
            });
            expect(store.dispatch).toHaveBeenCalledWith(finishLoading());
            done();
        });
    });
});
