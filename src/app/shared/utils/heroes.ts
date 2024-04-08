import { Hero } from '../../heroes/core/interfaces';

export const getHeroesByName = (heroes: Hero[],  name = '' ) => {

    name = name.toLocaleLowerCase().trim();
    
    if ( name.length === 0 ) return [];

    return heroes.filter(
        hero => hero.superhero.toLocaleLowerCase().includes( name ) 
    );

}