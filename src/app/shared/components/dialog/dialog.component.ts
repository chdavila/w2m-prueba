import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DialogCustom } from './';

@Component({
  selector: 'w2m-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustom,
  ) {}

  handleSuccess() {
    if (this.data.successFn) {
      this.data.successFn();
    }
    this.dialogRef.close();
  }

  close() {
    if (this.data.errorFn) {
      this.data.errorFn();
    }
    this.dialogRef.close();
  }
}
