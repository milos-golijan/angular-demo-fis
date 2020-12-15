import { Deserialize } from 'cerialize';
import { genContactData } from 'src/app/test/test-data';

import Contact from '../contact.model';

describe('Contact Model', () => {

    const mockContact: Contact = Deserialize(genContactData(), Contact);

    it('Getters should work properly', () => {
        expect(mockContact.address).toEqual(mockContact.addressDetails.fullAddress);
        expect(mockContact.fullName).toEqual(`${mockContact.firstName} ${mockContact.lastName}`);
    });
});
