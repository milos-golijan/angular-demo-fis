import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactNewComponent } from './components/contact-new/contact-new.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
    {
        path: '',
        component: ContactListComponent,
        pathMatch: 'full'
    },
    {
        path: 'new',
        component: ContactNewComponent,
        pathMatch: 'full'
    },
    {
        path: 'edit/:id',
        component: ContactEditComponent,
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
