import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'ws/:workspace',
        children: [
            {
                path: 'contact',
                loadChildren: () =>
                    import('./contact/contact.routing.module').then(module => module.ContactRoutingModule)
            },
            {
                path: 'company',
                loadChildren: () =>
                    import('./company/company.routing.module').then(module => module.CompanyRoutingModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
