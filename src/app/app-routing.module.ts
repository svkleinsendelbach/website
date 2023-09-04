import { RouterModule, Routes } from '@angular/router';
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
    {
        path: '**',
        component: PageNotFoundPage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
