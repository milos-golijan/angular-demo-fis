import {
    Input,
    Output,
    Component,
    EventEmitter
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';
import Contact from '../../contact.model';

@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {

    @Input() contact: Contact;
    @Output() edit: EventEmitter<string>;
    @Output() delete: EventEmitter<string>;
    private reference: MatDialogRef<ConfirmDialogComponent>;

    public constructor(
        public dialog: MatDialog
    ) {
        this.edit = new EventEmitter<string>();
        this.delete = new EventEmitter<string>();
    }

    public onEdit(): void {
        this.edit.emit(this.contact.id);
    }

    public onDelete(): void {
        this.reference = this.dialog.open(ConfirmDialogComponent, {
            data: {
                color: 'warn',
                title: 'Delete',
                message: `Are you sure you want to delete ${this.contact.fullName}?`
            }
        });
        this.reference.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.delete.emit(this.contact.id);
            }
        });
    }
}
