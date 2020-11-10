import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import {
    Serialize,
    Deserialize
} from 'cerialize';
import {
    genArray,
    genContactData
} from '../test/test-data';
import Contact from './contact.model';

const CONTACTS_DATA_KEY = 'contacts';
const CONTACTS_ARRAY_LENGTH = 32;

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    public constructor(
        private localStorage: LocalStorageService
    ) { }

    public getAll(): Observable<Contact[]> {
        let contacts = [];
        if (this.localStorage.exists(CONTACTS_DATA_KEY)) {
            contacts = this.localStorage.get(CONTACTS_DATA_KEY);
        } else {
            contacts = genArray(genContactData, CONTACTS_ARRAY_LENGTH);
            this.localStorage.set(CONTACTS_DATA_KEY, contacts);
        }
        return of(contacts).pipe(
            map((contactsData: any[]) => {
                return contactsData.map(contactData => Deserialize(contactData, Contact));
            }
        ));
    }

    public create(contact: Contact): Observable<any> {
        const contacts = this.localStorage.get(CONTACTS_DATA_KEY) as Contact[];
        contacts.push(Serialize(contact));
        this.localStorage.set(CONTACTS_DATA_KEY, contacts);
        return of({});
    }

    public update(updatedContact: Contact): Observable<any> {
        let contacts = this.localStorage.get(CONTACTS_DATA_KEY) as Contact[];
        const index = contacts.findIndex(contact => contact.id === updatedContact.id);
        contacts = contacts.filter(contact => contact.id !== updatedContact.id);
        contacts.splice(index, 0, Serialize(updatedContact));
        this.localStorage.set(CONTACTS_DATA_KEY, contacts);
        return of({});
    }

    public delete(contactId: string): Observable<any> {
        let contacts = this.localStorage.get(CONTACTS_DATA_KEY) as Contact[];
        contacts = contacts.filter(contact => contact.id !== contactId);
        this.localStorage.set(CONTACTS_DATA_KEY, contacts);
        return of({});
    }
}
