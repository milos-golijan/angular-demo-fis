import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './components/home/home.component';

// Imports
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
