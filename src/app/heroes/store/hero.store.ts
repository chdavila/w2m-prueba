import { Injectable } from "@angular/core";

import { BaseStore } from "../../store/base.store";

import { IHeroesStore, HeroesWorld, Hero } from "../core/interfaces";

export const initialState: IHeroesStore = {
  heroes: {
    dc: [],
    marvel: []
  }
}

@Injectable()
export class HeroesStore extends BaseStore<IHeroesStore> {
  constructor() {
    super(initialState);
  }

  get hero$() { return this.select(state => state.heroes) };
  get heroes() { return this.store.heroes };

  updateHeroes(heroes: Partial<HeroesWorld>) {
    this.updateStore({
      ...this.store,
      heroes: {
        ...this.store.heroes,
        ...heroes
      }
    });
  };

  patchHero(hero: Hero, key: 'dc' | 'marvel') {
    this.updateStore({
      ...this.store,
      heroes: {
        ...this.store.heroes,
        [key] : [
          ...this.store.heroes[key].map(currentHero => currentHero.id === hero.id ? ({...hero}) : ({...currentHero})),
        ]
      }
    });
  }

  addHero(hero: Hero, key: 'dc' | 'marvel') {
    this.updateStore({
      ...this.store,
      heroes: {
        ...this.store.heroes,
        [key] : [
          ...this.store.heroes[key],
          hero
        ]
      }
    });
  };

  deleteHero(idHero: string, key: 'dc' | 'marvel') {
    this.updateStore({
      ...this.store,
      heroes: {
        ...this.store.heroes,
        [key] : [
          ...this.store.heroes[key].filter(hero => hero.id !== idHero)
        ]
      }
    });
  }
}