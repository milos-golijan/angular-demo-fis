import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    Input,
    OnInit,
    Output,
    OnDestroy,
    Component,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ContactState,
    getFormComplete,
    getFormError,
} from '../../state/contact.reducer';
import {
    contactFormRestart
} from '../../state/contact.actions';
import Contact from '../../contact.model';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnDestroy {

    @Input() submitText: string;
    @Input() contact: Contact;
    @Output() saved: EventEmitter<Contact>;
    @Output() completed: EventEmitter<void>;
    public error: string;
    public submited: boolean;
    public form: FormGroup;
    private errorSubscription: Subscription;
    private completeSubscription: Subscription;

    public constructor(
        private store: Store<{ contact: ContactState }>
    ) {
        this.saved = new EventEmitter<Contact>();
        this.completed = new EventEmitter<void>();
    }

    public ngOnInit(): void {
        if (!this.submitText) {
            this.submitText = 'CREATE';
        }
        this.store.dispatch(contactFormRestart());
        this.errorSubscription = this.store
        .select(getFormError)
        .subscribe((error: string) => {
            this.error = error;
        });
        this.completeSubscription = this.store
        .select(getFormComplete)
        .subscribe((complete: boolean) => {
            if (complete) {
                this.completed.emit();
            }
        });
        this.initForm();
    }

    public ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
        this.completeSubscription.unsubscribe();
    }

    public onCreate(): void {
        if (this.form.valid) {
            const newContact = new Contact(this.form.value);
            if (this.contact) {
                newContact.id = this.contact.id;
            }
            this.saved.emit(newContact);
        }
    }

    private initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl(this.contact?.lastName, Validators.required),
            firstName: new FormControl(this.contact?.firstName, Validators.required),
            email: new FormControl(this.contact?.email, [ Validators.required, Validators.email ]),
            gender: new FormControl(this.contact?.gender || 'male', Validators.required),
            title: new FormControl(this.contact?.title, Validators.required),
            company: new FormControl(this.contact?.company, Validators.required),
            phoneNumber: new FormControl(this.contact?.phoneNumber, Validators.required),
            addressDetails: new FormGroup({
                zip: new FormControl(this.contact?.addressDetails?.zip, [ Validators.required, Validators.maxLength(5) ]),
                city: new FormControl(this.contact?.addressDetails?.city, Validators.required),
                street: new FormControl(this.contact?.addressDetails?.street, Validators.required),
                country: new FormControl(this.contact?.addressDetails?.country, Validators.required)
            })
        });
    }
}
