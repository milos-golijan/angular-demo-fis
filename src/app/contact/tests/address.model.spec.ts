import { Deserialize } from 'cerialize';
import { genAddressData } from 'src/app/test/test-data';

import Address from '../address.model';

describe('Contact Model', () => {

    const mockAddress: Address = Deserialize(genAddressData(), Address);

    it('Getters should work properly', () => {
        expect(mockAddress.fullAddress).toEqual(`${mockAddress.street}, ${mockAddress.city}, ${mockAddress.country}`);
    });
});
