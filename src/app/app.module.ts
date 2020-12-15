import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

// Internal Imports
import { AppRoutingModule } from './app.routing.module';

// Components
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { contactReducer, ContactState } from './contact/state/contact.reducer';
import { sharedReducer, SharedState } from './shared/state/shared.reducer';
import { CompanyModule } from './company/company.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HomeModule,
        SharedModule,
        ContactModule,
        CompanyModule,
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
