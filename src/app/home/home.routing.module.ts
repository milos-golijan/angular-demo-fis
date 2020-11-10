import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../shared/services/routing.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: Route.Home,
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
