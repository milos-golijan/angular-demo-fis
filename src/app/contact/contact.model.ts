import * as faker from 'faker';
import {
    autoserialize,
    autoserializeAs
} from 'cerialize';
import Address from './address.model';

const ID_CHAR_LENGTH = 16;

export default class Contact {

    @autoserialize id: string;
    @autoserialize email: string;
    @autoserialize title: string;
    @autoserialize gender: string;
    @autoserialize company: string;
    @autoserialize lastName: string;
    @autoserialize firstName: string;
    @autoserialize phoneNumber: string;
    @autoserializeAs(Date, 'signUpDate') signUpDate: Date;
    @autoserializeAs(Address) addressDetails: Address;
    public get address(): string {
        return this.addressDetails?.fullAddress;
    }
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public constructor(data?: Partial<Contact>) {
        this.id = faker.random.alphaNumeric(ID_CHAR_LENGTH);
        if (data) {
            Object.assign(this, data);
            this.addressDetails = new Address(data.addressDetails);
        }
    }
}
