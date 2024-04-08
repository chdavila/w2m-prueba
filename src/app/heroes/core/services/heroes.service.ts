import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { Hero } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private readonly http = inject(HttpClient);

  getDcHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apis.getDcHereos, {
      headers: {
        'Reference-Operation': 'getDcHeroes'
      }
    })
  };

  getMarvelHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apis.getMarvelHereos, {
      headers: {
        'Reference-Operation': 'getMarvelHeroes'
      }
    })
  };

  createHero(body: Hero): Observable<void> {
    return this.http.post<void>(environment.apis.createHero, body, {
      headers: {
        'Reference-Operation': 'createHero'
      }
    })
  };

  updateHero(body: Hero): Observable<Hero[]> {
    return this.http.patch<Hero[]>(environment.apis.upadteHero, body,{
      headers: {
        'Reference-Operation': 'getMarvelHeroes'
      }
    })
  };
}
