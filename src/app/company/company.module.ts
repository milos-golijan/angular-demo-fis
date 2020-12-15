import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';

// Imports
import { SharedModule } from '../shared/shared.module';
import { CompanyRoutingModule } from './company.routing.module';

// State
import { CompanyEffects } from './state/company.effects';
import { companyReducer } from './state/company.reducer';

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyCardComponent
    ],
    imports: [
        SharedModule,
        CompanyRoutingModule,
        EffectsModule.forFeature([ CompanyEffects ]),
        StoreModule.forFeature('company', companyReducer)
    ]
})
export class CompanyModule { }
