import {
    TestBed,
    waitForAsync,
    ComponentFixture
} from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { AgGridModule } from 'ag-grid-angular';

import { DEFAULT_TABLE_OPTIONS, TableComponent, TableOptions } from './table.component';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MockModule(AgGridModule.withComponents())
            ],
            declarations: [
                TableComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should set default options if no other avialable', () => {
        const mockOptions: TableOptions = {
            pagination: true
        };
        component.options = mockOptions;
        component.ngOnInit();
        expect(component.options).toEqual(mockOptions);
        component.options = null;
        component.ngOnInit();
        expect(component.options).toEqual(DEFAULT_TABLE_OPTIONS);
    });
});
