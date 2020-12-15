import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoutingServiceStub } from 'src/app/test/service-stub';

import { HeaderComponent } from './header.component';
import { Route, RoutingService } from '../../services/routing.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { changeWorkspace } from '../../state/shared.actions';

const TEST_WORKSPACE = 'test';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routingServiceMock: RoutingServiceStub;
    let store: MockStore;

    const initialState = {
        shared: {
            workspace: TEST_WORKSPACE
        }
    };

    beforeEach(waitForAsync(() => {
        routingServiceMock = new RoutingServiceStub();

        TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatSelectModule),
                MockModule(MatToolbarModule),
            ],
            declarations: [
                HeaderComponent
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
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should be able to toggle sidebar', () => {
        spyOn(component.sidebarToggled, 'emit');
        component.onToggleSidebar();
        expect(component.sidebarToggled.emit).toHaveBeenCalled();
    });

    it('Should change workspace and navigate on workspace changed', () => {
        spyOn(store, 'dispatch');
        spyOn(routingServiceMock, 'navigate');
        const differentWorkspaceMock = 'test2';
        component.onWorkspaceChanged(differentWorkspaceMock);
        expect(routingServiceMock.navigate).toHaveBeenCalledWith(Route.Home);
        expect(store.dispatch).toHaveBeenCalledWith(changeWorkspace({ workspace: differentWorkspaceMock }));
    });
});
