import { waitForAsync } from '@angular/core/testing';
import { InitialsPipe } from '../initials.pipe';

const UNKNOWN_VALUE = 'N/A';

describe('InitialsPipe', () => {

    let pipe: InitialsPipe;

    beforeEach(waitForAsync(() => {
        pipe = new InitialsPipe();
    }));

    it('Should transform undefined to unknown value', () => {
        expect(pipe.transform(undefined)).toBe(UNKNOWN_VALUE);
    });

    it('Should transform "Test" to unknown "T"', () => {
        expect(pipe.transform('Test')).toBe('T');
    });

    it('Should transforms "Test User" to "TU" value', () => {
        expect(pipe.transform('Test User')).toBe('TU');
    });
});
