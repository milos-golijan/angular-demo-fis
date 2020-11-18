import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';

// Internal Imports
import { AppRoutingModule } from './app.routing.module';

// Components
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HomeModule,
        SharedModule,
        ContactModule,
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
