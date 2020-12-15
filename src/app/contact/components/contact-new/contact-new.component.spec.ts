import { Deserialize } from 'cerialize';
import { MockComponent } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { genContactData } from 'src/app/test/test-data';
import { addContact } from '../../state/contact.actions';
import { RoutingServiceStub } from 'src/app/test/service-stub';
import { Route, RoutingService } from 'src/app/shared/services/routing.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import Contact from '../../contact.model';

import { ContactNewComponent } from './contact-new.component';

describe('ContactNewComponent', () => {

    let component: ContactNewComponent;
    let fixture: ComponentFixture<ContactNewComponent>;
    let routingServiceMock: RoutingServiceStub;
    let store: MockStore;

    beforeEach(waitForAsync(() => {
        routingServiceMock = new RoutingServiceStub();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ContactNewComponent,
                MockComponent(ContactFormComponent)
            ],
            providers: [
                { provide: RoutingService, useValue: routingServiceMock },
                provideMockStore()
            ]
        })
        .compileComponents();

        store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should dispatch delete on delete contact', () => {
        spyOn(store, 'dispatch');
        const mockContact = Deserialize(genContactData(), Contact);
        component.onSaveContact(mockContact);
        expect(store.dispatch).toHaveBeenCalledWith(addContact({ contact: mockContact }));
    });

    it('Should navigate on completed', () => {
        spyOn(routingServiceMock, 'navigate');
        component.onCompleted();
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.ContactList);
    });
});
