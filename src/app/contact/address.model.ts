import { autoserialize } from 'cerialize';

export default class Address {

    @autoserialize zip: string;
    @autoserialize city: string;
    @autoserialize street: string;
    @autoserialize country: string;
    public get fullAdress(): string {
        return `${this.street}, ${this.city}, ${this.country}`;
    }

    constructor(data?: Partial<Address>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
