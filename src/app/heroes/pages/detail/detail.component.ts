import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { environment } from '@environment/environment';
import { Hero } from '../../core/interfaces';

@Component({
  selector: 'w2m-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent {
  private readonly location = inject(Location);
  
  urlImg = environment.static.urlImg;
  locationState = this.location.getState() as any;
  hero: Hero = this.locationState.hero;
}
