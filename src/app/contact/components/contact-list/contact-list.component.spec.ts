import { Deserialize } from 'cerialize';
import { MockComponent, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { deleteContact } from '../../state/contact.actions';
import { RoutingServiceStub } from 'src/app/test/service-stub';
import { genArray, genContactData } from 'src/app/test/test-data';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Route, RoutingService } from 'src/app/shared/services/routing.service';
import Contact from '../../contact.model';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {

    let component: ContactListComponent;
    let fixture: ComponentFixture<ContactListComponent>;
    let routingServiceMock: RoutingServiceStub;
    let store: MockStore;

    const initialState = {
        contact: {
            contacts: Deserialize(genArray(genContactData), Contact),
            formComplete: false
        }
    };

    beforeEach(waitForAsync(() => {
        routingServiceMock = new RoutingServiceStub();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MockModule(SharedModule)
            ],
            declarations: [
                ContactListComponent,
                MockComponent(ContactCardComponent)
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: RoutingService, useValue: routingServiceMock }
            ]
        })
        .compileComponents();

        store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should be able to change view', () => {
        const mockView = 'table';
        component.onViewChanged(mockView);
        expect(component.view).toBe(mockView);
    });

    it('Should unsubscribe on destroy', () => {
        spyOn(component.contactsSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.contactsSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('Should navigate on create', () => {
        spyOn(routingServiceMock, 'navigate');
        component.onCreate();
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.ContactNew);
    });

    it('Should navigate on edit', () => {
        spyOn(routingServiceMock, 'navigate');
        const mockId = '123';
        component.onEdit(mockId);
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.ContactEdit, mockId);
    });

    it('Should dispatch delete on delete contact', () => {
        spyOn(store, 'dispatch');
        const mockId = '123';
        component.onDelete(mockId);
        expect(store.dispatch).toHaveBeenCalledWith(deleteContact({ id: mockId }));
    });
});
