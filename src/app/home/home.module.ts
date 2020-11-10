import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './components/home/home.component';

// Imports
import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './home.routing.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        ContactRoutingModule
    ]
})
export class HomeModule { }
