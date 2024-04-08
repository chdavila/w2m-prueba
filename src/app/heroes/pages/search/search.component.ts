import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

import { HeroesStore } from '../../store/hero.store';

import { CardHeroComponent } from '../home/components/card-hero/card-hero.component';
import { getHeroesByName } from '../../../shared/utils';
import { Hero } from '../../core/interfaces';

@Component({
  selector: 'w2m-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CardHeroComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly heroesStore = inject(HeroesStore);
  private readonly cd = inject(ChangeDetectorRef);

  ctrlSearch = new FormControl('');
  heroes: Hero[] = [...this.heroesStore.heroes.dc, ...this.heroesStore.heroes.marvel];
  heroesFilter: Hero[] = [];

  ngOnInit(): void {
    this.ctrlSearch.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(word => {
      this.heroesFilter = getHeroesByName(this.heroes, word!);
      this.cd.markForCheck();
    })
  }
}
