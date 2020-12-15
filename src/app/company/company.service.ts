import { Observable, of } from 'rxjs';
import { Deserialize } from 'cerialize';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { LocalStorageService } from '../shared/services/local-storage.service';
import {
    genArray,
    genCompanyData
} from '../test/test-data';
import Company from './company.model';

const REQUEST_DELAY = 500;
const COMPANIES_ARRAY_LENGTH = 16;
const COMPANIES_DATA_KEY = 'companies';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    public constructor(
        private localStorage: LocalStorageService
    ) { }

    public getAll(): Observable<Company[]> {
        let companies = [];
        if (this.localStorage.exists(COMPANIES_DATA_KEY)) {
            companies = this.localStorage.get(COMPANIES_DATA_KEY);
        } else {
            companies = genArray(genCompanyData, COMPANIES_ARRAY_LENGTH);
            this.localStorage.set(COMPANIES_DATA_KEY, companies);
        }
        return of(companies).pipe(
            delay(REQUEST_DELAY),
            map((companiesData: any[]) => {
                return companiesData.map(companyData => Deserialize(companyData, Company));
            }
        ));
    }
}
