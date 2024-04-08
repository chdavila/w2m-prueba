import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Hero } from '../../../../core/interfaces';
import { environment } from '@environment/environment';

@Component({
  selector: 'w2m-card-hero',
  standalone: true,
  imports: [CommonModule, RouterModule ,MatCardModule, MatButtonModule],
  templateUrl: './card-hero.component.html',
  styleUrl: './card-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeroComponent {
  hero = input.required<Hero>();

  urlImg = environment.static.urlImg;
}
