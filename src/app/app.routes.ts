import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'heroes',
                pathMatch: 'full'
            },
            {
                path: 'heroes',
                title: 'W2M - heroes',
                loadChildren: () => import('./heroes/heroes.routes').then(m => m.routes)
            }
        ]
    }
];
