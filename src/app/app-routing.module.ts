import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';
import { SportsHomeComponent } from './pages/about-us/sports-home/sports-home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'über-uns', component: ManagersComponent },
  { path: 'sportheim', component: SportsHomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
