import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IconSwitchComponent } from './icon-switch.component';

describe('IconSwitchComponent', () => {
    let component: IconSwitchComponent;
    let fixture: ComponentFixture<IconSwitchComponent>;
    const mockOptions = [
        { icon: 'person', value: 'cards' },
        { icon: 'grid_on', value: 'table' },
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatToolbarModule),
            ],
            declarations: [
                IconSwitchComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconSwitchComponent);
        component = fixture.componentInstance;
        component.options = mockOptions;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Getters should return proper values', () => {
        expect(component.first).toBe(mockOptions[0]);
        expect(component.second).toBe(mockOptions[1]);
    });

    it('Should select first if options available on changes', () => {
        component.options = null;
        component.ngOnChanges();
        expect(component.selected).toBe(undefined);
        component.options = mockOptions;
        component.ngOnChanges();
        expect(component.selected).toBe(mockOptions[0].value);
    });

    it('Should be able to select option', () => {
        spyOn(component.changed, 'emit');
        component.onSelect(mockOptions[1].value);
        expect(component.selected).toBe(mockOptions[1].value);
        expect(component.changed.emit).toHaveBeenCalled();
    });
});
