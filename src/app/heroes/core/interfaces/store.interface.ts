import { Hero } from "./heroes.interface"

export interface HeroesWorld {
    dc: Hero[];
    marvel: Hero[]
}

export interface IHeroesStore {
    heroes: HeroesWorld
}