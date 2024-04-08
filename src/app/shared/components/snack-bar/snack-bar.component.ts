import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackBarData } from './';

@Component({
  selector: 'w2m-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData,
  ) {}
}
