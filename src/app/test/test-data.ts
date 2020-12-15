import * as faker from 'faker';

const ID_CHAR_LENGTH = 16;
const DEFAULT_MIN_ARRAY_LENGTH = 1;
const DEFAULT_MAX_ARRAY_LENGTH = 20;
const PHONE_NUMBER_FORMAT = '(!##) !##-####';
const GENDERS = ['male', 'female'];

export const genAddressData = () => {
    return {
        zip: faker.address.zipCode(),
        city: faker.address.city(),
        street: faker.address.streetAddress(),
        country: faker.address.country()
    };
};

export const genContactData = () => {
    const genderIndex = faker.random.arrayElement([0, 1]);
    const lastName = faker.name.lastName(genderIndex);
    const firstName = faker.name.firstName(genderIndex);
    return {
        lastName,
        firstName,
        gender: GENDERS[genderIndex],
        id: faker.random.alphaNumeric(ID_CHAR_LENGTH),
        email: faker.internet.email(firstName, lastName),
        title: faker.name.jobTitle(),
        company: faker.company.companyName(),
        phoneNumber: faker.phone.phoneNumber(PHONE_NUMBER_FORMAT),
        signUpDate: faker.date.past(5),
        addressDetails: genAddressData()
    };
};

export const genCompanyData = () => {
    return {
        id: faker.random.alphaNumeric(ID_CHAR_LENGTH),
        name: faker.company.companyName(),
        moto: faker.company.catchPhrase(),
        website: faker.internet.url()
    };
};

export const genArray = (genFunction: () => any, length = faker.random.number(
    { min: DEFAULT_MIN_ARRAY_LENGTH, max: DEFAULT_MAX_ARRAY_LENGTH }
)) => {
    const newArray: any[] = [];
    for (let i = 0; i < length; i++) {
        newArray.push(genFunction());
    }
    return newArray;
};
