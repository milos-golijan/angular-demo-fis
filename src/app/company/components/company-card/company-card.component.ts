import {
    Input,
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import Company from '../../company.model';

@Component({
    selector: 'app-company-card',
    templateUrl: './company-card.component.html',
    styleUrls: ['./company-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyCardComponent {

    @Input() company: Company;

    public constructor() { }
}
