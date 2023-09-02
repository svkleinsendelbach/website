import { RouterModule, Routes } from '@angular/router';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { NgModule } from '@angular/core';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { internalRoutes } from './types/internal-routes';

/* eslint-disable sort-keys */
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    ...internalRoutes,
    { path: 'spiel/:id',
        component: GameDetailPage },
    { path: '**',
        component: PageNotFoundPage }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
