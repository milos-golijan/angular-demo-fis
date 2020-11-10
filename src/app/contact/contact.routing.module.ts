import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../shared/services/routing.service';
import { ContactNewComponent } from './components/contact-new/contact-new.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
    {
        path: Route.ContactNew,
        component: ContactNewComponent,
        pathMatch: 'full'
    },
    {
        path: Route.ContactEdit + ':id',
        component: ContactEditComponent,
        pathMatch: 'full'
    },
    {
        path: Route.ContactList,
        component: ContactListComponent,
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
