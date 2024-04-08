import { Routes } from '@angular/router';

import { heroesResolver, loadHeroResolver } from './core/resolvers';

import { HeroesComponent } from './heroes.component';
import { HeroesStore } from './store/hero.store';

export const routes: Routes = [
    {
        path: '',
        component: HeroesComponent,
        providers: [
            { provide: HeroesStore }
        ],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '',
                resolve: {hero: heroesResolver},
                children: [
                    {
                        path: 'home',
                        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
                    },
                    {
                        path: 'search',
                        loadComponent: () => import('./pages/search/search.component').then(c => c.SearchComponent)
                    },
                    {
                        path: 'new-hero',
                        loadComponent: () => import('./pages/new-hero/new-hero.component').then(c => c.NewHeroComponent)
                    },
                ]
            },
            {
                path: 'hero-detail',
                loadComponent: () => import('./pages/detail/detail.component').then(c => c.DetailComponent)
            },
            {
                path: ':id/update',
                resolve: {hero: loadHeroResolver},
                loadComponent: () => import('./pages/edit/edit.component').then(c => c.EditComponent)
            },
        ]
    }
];
