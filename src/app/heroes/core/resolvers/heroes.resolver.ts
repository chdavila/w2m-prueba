import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, catchError, first, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';

import { HeroesStore } from '../../store/hero.store';
import { HeroesService } from '../services';

import { HeroesWorld } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components';
import { DialogCustom } from '../../../shared/components/dialog';

export const heroesResolver: ResolveFn<Observable<HeroesWorld>> = (route, state) => {
  const heroesServices = inject(HeroesService);
  const heroesStore = inject(HeroesStore);
  const dialogService = inject(MatDialog);
  const router = inject(Router);

  const urlDc$ = heroesServices.getDcHeroes();
  const urlMarvel$ = heroesServices.getMarvelHeroes();
  return heroesStore.hero$.pipe(
    first(),
    switchMap(({ dc, marvel }) => {
      const joins$ = forkJoin([urlDc$, urlMarvel$]);
      if (dc.length === 0 && marvel.length === 0) return joins$;
      return of([dc, marvel]);
    }),
    map(([dc, marvel]) => ({dc, marvel})),
    tap(data => heroesStore.updateHeroes({ ...data })),
    catchError((err) => {
      console.warn('Handle error', err);
      const data: DialogCustom = {
        title: 'Error al obtener heroes',
        subtitle: 'Tuvimos un error al obtener los superheroes, por favor intentalo de nuevo',
        hasErrorBtn: false,
        successLabel: 'Reintentar',
        successFn: () => router.navigateByUrl(state.url)
      }
      dialogService.open(DialogComponent, {
        disableClose: true,
        data
      })
      return throwError(() => err);
    })
  );
};
