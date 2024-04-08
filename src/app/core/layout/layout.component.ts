import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../../shared/components';

@Component({
  selector: 'w2m-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
