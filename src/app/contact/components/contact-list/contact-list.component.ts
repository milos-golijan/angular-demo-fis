import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Route, RoutingService } from '../../../shared/services/routing.service';
import { IconSwitchOption } from 'src/app/shared/components/icon-switch/icon-switch.component';
import {
    ContactState,
    getContacts
} from '../../state/contact.reducer';
import {
    loadContacts,
    deleteContact,
    updateContact
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
        private changeDetectionRef: ChangeDetectorRef,
        private store: Store<{ contact: ContactState }>
    ) {
        // Custom detection example, not really needed
        // Used to detach from default change detection
        // Component will only update when detectChanges is manually called
        changeDetectionRef.detach();
    }

    public ngOnInit(): void {
        this.store.dispatch(loadContacts());
        this.view = 'cards';
        this.contactsSubscription = this.store
        .select(getContacts)
        .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            // Custom detection example, not really needed
            // Used to detect changes after contacts are loaded
            // This happens both initially and when data is changed
            this.changeDetectionRef.detectChanges();
        });
        this.switchOptions = [
            { icon: 'person', value: 'cards' },
            { icon: 'grid_on', value: 'table' },
        ];
        this.tableOptions = {
            pagination: true,
            paginationPageSize: 20
        };
        const columnValueSetter = params => {
            this.updateContactData(params.data, params.colDef.field, params.newValue);
            return true;
        };
        this.columns = [
            { field: 'fullName', width: 180 },
            {
                field: 'title',
                width: 250,
                filter: true,
                editable: true,
                valueSetter: columnValueSetter
            },
            {
                field: 'company',
                sortable: true,
                editable: true,
                valueSetter: columnValueSetter
            },
            {
                field: 'email',
                width: 250,
                editable: true,
                valueSetter: columnValueSetter
            },
            { field: 'phoneNumber', width: 130 },
            { field: 'address', width: 450 }
        ];
        // Custom detection example, not really needed
        // Used to detect changes caused by default component inputs to child components
        this.changeDetectionRef.detectChanges();
    }

    public onViewChanged(view: string): void {
        this.view = view;
        // Custom detection example, not really needed
        // Used to detect chages after view is changed
        this.changeDetectionRef.detectChanges();
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

    private updateContactData(contact: Contact, field: string, value: any): void {
        const updatedContact: Contact = new Contact({ ...contact, [field]: value });
        this.store.dispatch(updateContact({ contact: updatedContact }));
    }
}
