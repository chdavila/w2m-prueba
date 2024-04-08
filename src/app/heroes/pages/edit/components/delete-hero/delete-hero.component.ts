import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogDeleteHero } from '../../../../core/interfaces';

@Component({
  selector: 'w2m-delete-hero',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-hero.component.html',
  styleUrl: './delete-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteHeroComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteHero,
  ) {}

  close(deleting: boolean) {
    this.dialogRef.close(deleting)
  }
}
