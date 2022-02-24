import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';
import { SportsHomeComponent } from './pages/about-us/sports-home/sports-home.component';
import { ChronicleComponent } from './pages/about-us/chronicle/chronicle.component';
import { StatuteComponent } from './pages/about-us/statute/statute.component';
import { PrivacyComponent } from './pages/about-us/privacy/privacy.component';
import { RequestComponent } from './pages/about-us/request/request.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GeneralComponent } from './pages/football-adults/general/general.component';
import { FirstTeamComponent } from './pages/football-adults/first-team/first-team.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'über-uns', component: ManagersComponent },
  { path: 'sportheim', component: SportsHomeComponent },
  { path: 'chroniken', component: ChronicleComponent },
  { path: 'satzung', component: StatuteComponent },
  { path: 'datenschutz', component: PrivacyComponent },
  { path: 'mitgliedsantrag', component: RequestComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: 'fussball/herren', component: GeneralComponent },
  { path: 'fussball/herren/erste-mannschaft', component: FirstTeamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
