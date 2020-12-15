import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingServiceStub } from 'src/app/test/service-stub';
import { Route, RoutingService } from '../../services/routing.service';

import { SidebarContainerComponent } from './sidebar-container.component';

describe('SidebarContainerComponent', () => {
    let component: SidebarContainerComponent;
    let fixture: ComponentFixture<SidebarContainerComponent>;
    let routingServiceMock: RoutingServiceStub;

    beforeEach(waitForAsync(() => {
        routingServiceMock = new RoutingServiceStub();
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MockModule(MatIconModule),
                MockModule(MatSidenavModule)
            ],
            declarations: [
                SidebarContainerComponent
            ],
            providers: [
                { provide: RoutingService, useValue: routingServiceMock }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should return proper value on isActive', () => {
        routingServiceMock.navigate(Route.ContactList);
        expect(component.isActive(Route.ContactList)).toBe(true);
    });

    it('Should return proper value on isActive with full match', () => {
        routingServiceMock.navigate(Route.ContactEdit);
        expect(component.isActive(Route.ContactEdit, true)).toBe(true);
    });

    it('Should call routing service on navigate', () => {
        spyOn(routingServiceMock, 'navigate');
        component.onNavigate(Route.ContactList);
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.ContactList);
    });

    afterEach(() => {
        routingServiceMock.destroy();
    });
});
