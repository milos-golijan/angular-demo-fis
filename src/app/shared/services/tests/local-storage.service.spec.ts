import { waitForAsync } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage.service';

const TEST_KEY = 'test';
const TEST_VALUE = { text: 'test' };

describe('LocalStorageService', () => {

    let service: LocalStorageService;

    beforeEach(waitForAsync(() => {
        service = new LocalStorageService();
        localStorage.removeItem(TEST_KEY);
    }));

    it('Should create instances', () => {
        expect(service).toBeDefined();
    });

    it('Should return if key value exists', () => {
        expect(service.exists(TEST_KEY)).toBe(false);
        localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));
        expect(service.exists(TEST_KEY)).toBe(true);
    });

    it('Should get value from localstorage', () => {
        expect(service.get(TEST_KEY)).toEqual(null);
        localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));
        expect(service.get(TEST_KEY)).toEqual(TEST_VALUE);
    });

    it('Should set value to localstorage', () => {
        service.set(TEST_KEY, TEST_VALUE);
        expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(TEST_VALUE);
    });
});
