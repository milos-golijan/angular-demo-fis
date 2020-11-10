import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, RoutingService } from '../../../shared/services/routing.service';
import {
    ContactState,
    getEditedContact
} from '../../state/contact.reducer';
import {
    loadContacts,
    updateContact,
    startEditContact
} from '../../state/contact.actions';
import Contact from '../../contact.model';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit, OnDestroy {

    public contact: Contact;
    public contactId: string;
    public submited: boolean;
    private editedContactSubscription: Subscription;

    public constructor(
        private route: ActivatedRoute,
        private routingService: RoutingService,
        private store: Store<{ contact: ContactState }>
    ) { }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.contactId = params.id;
        });
        this.store.dispatch(loadContacts());
        this.editedContactSubscription = this.store
        .select(getEditedContact)
        .subscribe((edited: Contact) => {
            this.contact = edited;
            if (this.contact?.id !== this.contactId) {
                this.store.dispatch(startEditContact({ id: this.contactId }));
            }
        });
    }

    public ngOnDestroy(): void {
        this.editedContactSubscription.unsubscribe();
    }

    public onSaveContact(contact: Contact): void {
        this.submited = true;
        this.store.dispatch(updateContact({ contact }));
    }

    public onCompleted(): void {
        this.routingService.navigate(Route.ContactList);
    }
}
