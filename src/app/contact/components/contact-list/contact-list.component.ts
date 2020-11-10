import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, RoutingService } from '../../../shared/services/routing.service';
import { IconSwitchOption } from 'src/app/shared/components/icon-switch/icon-switch.component';
import {
    ContactState,
    getContacts
} from '../../state/contact.reducer';
import {
    loadContacts,
    deleteContact
} from '../../state/contact.actions';
import {
    TableOptions,
    TableColumnDefinition
} from 'src/app/shared/components/table/table.component';
import Contact from '../../contact.model';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

    public view: string;
    public contacts: Contact[];
    public tableOptions: TableOptions;
    public switchOptions: IconSwitchOption[];
    public columns: TableColumnDefinition[];
    private contactsSubscription: Subscription;

    public constructor(
        private routingService: RoutingService,
        private store: Store<{ contact: ContactState }>
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(loadContacts());
        this.view = 'cards';
        this.contactsSubscription = this.store
        .select(getContacts)
        .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
        });
        this.switchOptions = [
            { icon: 'person', value: 'cards' },
            { icon: 'grid_on', value: 'table' },
        ];
        this.tableOptions = {
            pagination: true,
            paginationPageSize: 20
        };
        this.columns = [
            { field: 'fullName', width: 180, editable: true },
            { field: 'title', width: 250, filter: true },
            { field: 'company', sortable: true },
            { field: 'email', width: 250 },
            { field: 'phoneNumber', width: 130 },
            { field: 'address', width: 450 }
        ];
    }

    public onViewChanged(view: string): void {
        this.view = view;
    }

    public ngOnDestroy(): void {
        this.contactsSubscription.unsubscribe();
    }

    public onCreate(): void {
        this.routingService.navigate(Route.ContactNew);
    }

    public onEdit(contactId: string): void {
        this.routingService.navigate(Route.ContactEdit, contactId);
    }

    public onDelete(contactId: string): void {
        this.store.dispatch(deleteContact({ id: contactId }));
    }
}
