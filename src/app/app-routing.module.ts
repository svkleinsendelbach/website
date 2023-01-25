import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { internalRoutes } from './classes/InternalRoutes';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  ...internalRoutes,
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
