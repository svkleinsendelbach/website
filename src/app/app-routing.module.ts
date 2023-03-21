import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { internalRoutes } from './types/internal-routes';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { NewsDetailPage } from './pages/news/news-detail/news-detail.page';
import { GameDetailPage } from './pages/game-detail/game-detail.page';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    ...internalRoutes,
    { path: 'nachricht/:id', component: NewsDetailPage },
    { path: 'spiel/:id', component: GameDetailPage},
    { path: '**', component: PageNotFoundPage }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
