import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { ContactNewComponent } from './components/contact-new/contact-new.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

// Imports
import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact.routing.module';

// State
import { ContactEffects } from './state/contact.effects';
import { contactReducer } from './state/contact.reducer';

@NgModule({
    declarations: [
        ContactNewComponent,
        ContactEditComponent,
        ContactListComponent,
        ContactCardComponent,
        ContactFormComponent
    ],
    imports: [
        SharedModule,
        ContactRoutingModule,
        EffectsModule.forFeature([ ContactEffects ]),
        StoreModule.forFeature('contact', contactReducer)
    ]
})
export class ContactModule { }
