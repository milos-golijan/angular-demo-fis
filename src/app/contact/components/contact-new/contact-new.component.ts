import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Route, RoutingService } from '../../../shared/services/routing.service';
import { addContact } from '../../state/contact.actions';
import { ContactState } from '../../state/contact.reducer';
import Contact from '../../contact.model';

@Component({
    selector: 'app-contact-new',
    templateUrl: './contact-new.component.html'
})
export class ContactNewComponent {

    public constructor(
        private routingService: RoutingService,
        private store: Store<{ contact: ContactState }>
    ) { }

    public onSaveContact(contact: Contact): void {
        this.store.dispatch(addContact({ contact }));
    }

    public onCompleted(): void {
        this.routingService.navigate(Route.ContactList);
    }
}
