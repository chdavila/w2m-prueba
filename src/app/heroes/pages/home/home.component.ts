import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroesStore } from '../../store/hero.store';

import { CardHeroComponent } from './components/card-hero/card-hero.component';

@Component({
  selector: 'w2m-home',
  standalone: true,
  imports: [CommonModule, CardHeroComponent, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly heroesStore = inject(HeroesStore);

  heroes = this.heroesStore.hero$;
  selectedIndex = +this.route.snapshot.queryParams['tab'] || 0;

  handleUpdateParams({ index }: MatTabChangeEvent) {
    this.router.navigate([], { queryParams: { tab: index } });
  }
}
