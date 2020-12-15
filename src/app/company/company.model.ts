import * as faker from 'faker';
import { autoserialize } from 'cerialize';

const ID_CHAR_LENGTH = 16;

export default class Company {

    @autoserialize id: string;
    @autoserialize name: string;
    @autoserialize moto: string;
    @autoserialize website: string;

    public constructor(data?: Partial<Company>) {
        this.id = faker.random.alphaNumeric(ID_CHAR_LENGTH);
        if (data) {
            Object.assign(this, data);
        }
    }
}
