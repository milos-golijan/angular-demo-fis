import { Observable, of } from 'rxjs';
import { MockModule } from 'ng-mocks';
import { Deserialize } from 'cerialize';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { genContactData } from 'src/app/test/test-data';
import Contact from '../../contact.model';

import { ContactCardComponent } from './contact-card.component';

class MatDialogRefStub {

    public mockValue: any;

    public afterClosed(): Observable<any> {
        return of(this.mockValue);
    }
}

class MatDialogStub {

    public mockRef: MatDialogRefStub;

    public constructor() {
        this.mockRef = new MatDialogRefStub();
    }

    public open(): MatDialogRefStub {
        return this.mockRef;
    }
}

describe('ContactCardComponent', () => {
    let component: ContactCardComponent;
    let fixture: ComponentFixture<ContactCardComponent>;
    let matDialogMock: MatDialogStub;

    beforeEach(waitForAsync(() => {
        matDialogMock = new MatDialogStub();

        TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatCardModule),
                MockModule(MatButtonModule)
            ],
            declarations: [
                InitialsPipe,
                ContactCardComponent
            ],
            providers: [
                { provide: MatDialog, useValue: matDialogMock }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.contact = Deserialize(genContactData(), Contact);
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should emit edit on edit', () => {
        spyOn(component.edit, 'emit');
        matDialogMock.mockRef.mockValue = true;
        component.onEdit();
        expect(component.edit.emit).toHaveBeenCalledWith(component.contact.id);
    });

    it('Should emit delete on dialog confirm', () => {
        spyOn(component.delete, 'emit');
        matDialogMock.mockRef.mockValue = true;
        component.onDelete();
        expect(component.delete.emit).toHaveBeenCalledWith(component.contact.id);
    });

    it('Should not emit delete on dialog decline', () => {
        spyOn(component.delete, 'emit');
        matDialogMock.mockRef.mockValue = false;
        component.onDelete();
        expect(component.delete.emit).not.toHaveBeenCalled();
    });
});
