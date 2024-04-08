import { inject } from '@angular/core';
import { ResolveFn, Router, } from '@angular/router';
import { EMPTY, catchError, first, map } from 'rxjs';

import { HeroesStore } from '../../store/hero.store';
import { Hero } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components';

export const loadHeroResolver: ResolveFn<Hero> = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar)
  const heroesStore = inject(HeroesStore);

  return heroesStore.hero$.pipe(
    first(),
    map(heroes => {
      const hero = [...heroes.dc, ...heroes.marvel].find(hero => hero.id === route.params['id']);
      if (!hero) throw "Hero doesn't exist";
      return hero;
    }),
    catchError(error => {
      console.warn('Handle error', error);
      snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
        panelClass: ['custom-snackbar', `custom-snackbar--error`],
        data: { message: `Heroe con id ${route.params['id']} no encontrado` }
      });
      router.navigate(['/heroes/home']);
      return EMPTY;
    })
  );
};
