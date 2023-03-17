import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { internalRoutes } from './types/InternalRoutes';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  ...internalRoutes,
  { path: 'nachricht/:id', component: NewsDetailComponent },
  { path: 'spiel/:id', component: GameDetailComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
