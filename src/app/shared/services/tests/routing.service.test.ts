import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Route, RoutingService } from '../routing.service';
import { AppRoutingModule } from 'src/app/app.routing.module';

const TEST_WORKSPACE = 'test';

describe('RoutingService', () => {

    let router: Router;
    let location: Location;
    let service: RoutingService;
    let store: MockStore;

    const initialState = {
        shared: {
            workspace: TEST_WORKSPACE
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                AppRoutingModule
            ],
            providers: [
                RoutingService,
                provideMockStore({ initialState }),
                { provide: APP_BASE_HREF, useValue : Route.Home }
            ]
        });

        service = TestBed.inject(RoutingService);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        store = TestBed.inject(MockStore);
    });

    it('Should create instances', () => {
        expect(service).toBeDefined();
    });

    it('Should return current route', () => {
        expect(service.currentRoute).toBe(router.url);
    });

    it('Should be able to navigate to given route without workspace', () => {
        spyOn(router, 'navigate');
        service.navigate(Route.Home);
        expect(router.navigate).toHaveBeenCalledWith([ Route.Home ]);
    });

    it('Should be able to navigate to given route with workspace', () => {
        spyOn(router, 'navigate');
        service.navigate(Route.ContactList);
        expect(router.navigate).toHaveBeenCalledWith([ 'ws/' + TEST_WORKSPACE + '/' + Route.ContactList ]);
    });

    it('Should be able to navigate back', () => {
        spyOn(location, 'back');
        service.navigateBack();
        expect(location.back).toHaveBeenCalled();
    });

    it('Should complete route subscription on destory', () => {
        spyOn(service.route, 'complete');
        service.ngOnDestroy();
        expect(service.route.complete).toHaveBeenCalled();
    });
});
