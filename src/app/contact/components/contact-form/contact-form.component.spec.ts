import { MockComponent, MockModule } from 'ng-mocks';
import { Deserialize } from 'cerialize';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { genContactData } from 'src/app/test/test-data';
import Contact from '../../contact.model';

import { ContactFormComponent } from './contact-form.component';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { getFormComplete, getFormError } from '../../state/contact.reducer';

const TEST_ERROR = 'TEST';
const EXAMPLE_TITLE = 'EDIT';
const DEFAULT_TITLE = 'CREATE';

describe('ContactFormComponent', () => {
    let component: ContactFormComponent;
    let fixture: ComponentFixture<ContactFormComponent>;
    let store: MockStore;
    const initialState = {
        contact: {
            contacts: [],
            formComplete: false
        }
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(MatCardModule),
                MockModule(MatRadioModule),
                MockModule(MatInputModule)
            ],
            declarations: [
                ContactFormComponent
            ],
            providers: [
                provideMockStore({ initialState })
            ]
        })
        .compileComponents();

        store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.contact = Deserialize(genContactData(), Contact);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should set form title if none set', () => {
        component.submitText = null;
        component.ngOnInit();
        expect(component.submitText).toBe(DEFAULT_TITLE);
    });

    it('Should set form title properly', () => {
        component.submitText = EXAMPLE_TITLE;
        component.ngOnInit();
        expect(component.submitText).toBe(EXAMPLE_TITLE);
    });

    it('Should set form error from state', () => {
        store.overrideSelector(
            getFormError, TEST_ERROR
        );
        store.refreshState();
        expect(component.error).toBe(TEST_ERROR);
    });

    it('Should emit complete if complete', () => {
        spyOn(component.completed, 'emit');
        store.overrideSelector(
            getFormComplete, true
        );
        store.refreshState();
        expect(component.completed.emit).toHaveBeenCalled();
    });

    it('Should emit complete if form valid', () => {
        spyOn(component.saved, 'emit');
        component.contact = Deserialize(genContactData(), Contact);
        component.ngOnInit();
        component.onComplete();
        expect(component.saved.emit).toHaveBeenCalledWith(new Contact({ ...(component.form.value), id: component.contact.id }));
    });

    it('Should emit complete if form valid and new contact', () => {
        spyOn(component.saved, 'emit');
        component.contact = Deserialize(genContactData(), Contact);
        component.ngOnInit();
        component.contact = null;
        component.onComplete();
        expect(component.saved.emit).toHaveBeenCalled();
    });

    it('Should not emit complete if form not valid', () => {
        spyOn(component.saved, 'emit');
        component.contact = null;
        component.ngOnInit();
        component.onComplete();
        expect(component.saved.emit).not.toHaveBeenCalled();
    });
});
