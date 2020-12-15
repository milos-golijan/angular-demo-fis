import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { DOMHelper } from 'src/app/test/dom-helper';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { getIsLoading } from '../../state/shared.reducer';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;
    let domHelper: DOMHelper<LoaderComponent>;
    let store: MockStore;
    const initialState = {
        shared: {
            inProgress: 0
        }
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MockModule(MatProgressSpinnerModule)
            ],
            declarations: [
                LoaderComponent
            ],
            providers: [
                provideMockStore({ initialState })
            ]
        })
        .compileComponents();

        store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        domHelper = new DOMHelper(fixture);
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should fetch isLoading from state properly', () => {
        /*store.overrideSelector(
            getIsLoading, true
        );
        store.refreshState();*/
        store.setState({ shared: { inProgress: 1 }});
        fixture.detectChanges();
        expect(domHelper.exists('.loading')).toBe(true);
        store.setState({ shared: { inProgress: 0 }});
        fixture.detectChanges();
        expect(domHelper.exists('.loading')).toBe(false);
    });
});
