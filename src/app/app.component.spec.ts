import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MockModule(SharedModule),
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Should toggle sidebar', () => {
        component.sideNavOpen = false;
        component.onToggleSidebar();
        expect(component.sideNavOpen).toBe(true);
    });
});
