const urlApi = 'http://localhost:8082';

export const environment = {
    apis: {
        getDcHereos: `${urlApi}/heroes/dc`,
        getMarvelHereos: `${urlApi}/heroes/marvel`,
        upadteHero: `${urlApi}/heroes`,
        createHero: `${urlApi}/heroes`
    },
    static: {
        urlImg: '/assets/images/heroes',
        urlUnsplash: 'https://source.unsplash.com/random/500x800'
    }
};
