import { Deserialize } from 'cerialize';
import { MockComponent } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { genContactData } from 'src/app/test/test-data';
import { ContactEditComponent } from './contact-edit.component';
import { getEditedContact } from '../../state/contact.reducer';
import { startEditContact, updateContact } from '../../state/contact.actions';
import { Route, RoutingService } from 'src/app/shared/services/routing.service';
import { ActivatedRouteStub, RoutingServiceStub } from 'src/app/test/service-stub';
import Contact from '../../contact.model';

import { ContactFormComponent } from '../contact-form/contact-form.component';

describe('ContactEditComponent', () => {

    let component: ContactEditComponent;
    let fixture: ComponentFixture<ContactEditComponent>;
    let activateRouteMock: ActivatedRouteStub;
    let routingServiceMock: RoutingServiceStub;
    let contact: Contact;
    let store: MockStore;

    const initialState = {
        contact: { }
    };

    beforeEach(waitForAsync(() => {
        activateRouteMock = new ActivatedRouteStub();
        activateRouteMock.mockParams = { id: '123' };
        routingServiceMock = new RoutingServiceStub();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ContactEditComponent,
                MockComponent(ContactFormComponent)
            ],
            providers: [
                { provide: ActivatedRoute, useValue: activateRouteMock },
                { provide: RoutingService, useValue: routingServiceMock },
                provideMockStore({ initialState })
            ]
        })
        .compileComponents();

        store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactEditComponent);
        component = fixture.componentInstance;
        contact = Deserialize(genContactData(), Contact);
        component.contact = contact;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should dispatch start edit on contact id mismatch', () => {
        spyOn(store, 'dispatch');
        component.contactId = '123';
        store.overrideSelector(
            getEditedContact, contact
        );
        store.refreshState();
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(startEditContact({ id: component.contactId }));
    });

    it('Should not dispatch start edit on contact id equal', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        component.contactId = contact.id;
        store.overrideSelector(
            getEditedContact, contact
        );
        store.refreshState();
        dispatchSpy.calls.reset();
        component.ngOnInit();
        expect(store.dispatch).not.toHaveBeenCalledWith(startEditContact({ id: contact.id }));
    });

    it('Should unsubscribe on destroy', () => {
        spyOn(component.editedContactSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.editedContactSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('Should dispatch update on save contact', () => {
        spyOn(store, 'dispatch');
        component.onSaveContact(contact);
        expect(component.submited).toBe(true);
        expect(store.dispatch).toHaveBeenCalledWith(updateContact({ contact }));
    });

    it('Should navigate on complete', () => {
        spyOn(routingServiceMock, 'navigate');
        component.onCompleted();
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.ContactList);
    });
});
