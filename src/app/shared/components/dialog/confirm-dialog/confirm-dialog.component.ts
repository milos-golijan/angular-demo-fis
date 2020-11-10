import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
    title: string;
    color: string;
    message: string;
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

    public constructor(
        public reference: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) { }

    public onChoice(choice: boolean): void {
        this.reference.close(choice);
    }
}
