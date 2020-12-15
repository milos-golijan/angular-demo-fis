import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { loadCompanies } from '../../state/company.actions';
import {
    getCompanies,
    CompanyState
} from '../../state/company.reducer';
import Company from '../../company.model';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit {

    public companies: Observable<Company[]>;
    public companiesSubscription: Subscription;

    public constructor(
        private store: Store<{ company: CompanyState }>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(loadCompanies());
        this.companies = this.store.select(getCompanies);
    }
}
