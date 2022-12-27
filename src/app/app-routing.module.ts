import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyComponent } from './pages/about-us/privacy/privacy.component';
import { RequestComponent } from './pages/about-us/request/request.component';
import { StatuteComponent } from './pages/about-us/statute/statute.component';
import { ChronicleComponent } from './pages/about-us/chronicle/chronicle.component';
import { SportshomeComponent } from './pages/about-us/sportshome/sportshome.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';
import { GeneralComponent as FootballAdultsGeneralComponent } from './pages/football-adults/general/general.component';
import { FirstTeamComponent } from './pages/football-adults/first-team/first-team.component';
import { SecondTeamComponent } from './pages/football-adults/second-team/second-team.component';
import { AhTeamComponent } from './pages/football-adults/ah-team/ah-team.component';
import { GeneralComponent as FootballYouthGeneralComponent } from './pages/football-youth/general/general.component'
import { CYouthComponent } from './pages/football-youth/c-youth/c-youth.component'
import { EYouthComponent } from './pages/football-youth/e-youth/e-youth.component'
import { FYouthComponent } from './pages/football-youth/f-youth/f-youth.component'
import { GYouthComponent } from './pages/football-youth/g-youth/g-youth.component'

const routes: Routes = [
  { path: 'über-uns', component: ManagersComponent },
  { path: 'sportheim', component: SportshomeComponent },
  { path: 'chroniken', component: ChronicleComponent },
  { path: 'satzung', component: StatuteComponent },
  { path: 'datenschutz', component: PrivacyComponent },
  { path: 'mitgliedsantrag', component: RequestComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: 'fussball/herren', component: FootballAdultsGeneralComponent },
  { path: 'fussball/herren/erste-mannschaft', component: FirstTeamComponent },
  { path: 'fussball/herren/zweite-mannschaft', component: SecondTeamComponent },
  { path: 'fussball/herren/alte-herren', component: AhTeamComponent },
  { path: 'fussball/jugend', component: FootballYouthGeneralComponent },
  { path: 'fussball/jugend/c-jugend', component: CYouthComponent },
  { path: 'fussball/jugend/e-jugend', component: EYouthComponent },
  { path: 'fussball/jugend/f-jugend', component: FYouthComponent },
  { path: 'fussball/jugend/g-jugend', component: GYouthComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
