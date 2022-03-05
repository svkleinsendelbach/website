import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home page
import { HomeComponent as Home_Component } from './pages/home/home.component';

// About us pages
import { ManagersComponent as AboutUs_Managers_Component } from './pages/about-us/managers/managers.component';
import { SportsHomeComponent as AboutUs_SportsHome_Component } from './pages/about-us/sports-home/sports-home.component';
import { ChronicleComponent as AboutUs_Chronicle_Component } from './pages/about-us/chronicle/chronicle.component';
import { StatuteComponent as AboutUs_Statute_Component } from './pages/about-us/statute/statute.component';
import { PrivacyComponent as AboutUs_Privacy_Component } from './pages/about-us/privacy/privacy.component';
import { RequestComponent as AboutUs_Request_Component } from './pages/about-us/request/request.component';

// Football adults pages
import { GeneralComponent as FootballAdults_General_Component } from './pages/football-adults/general/general.component';
import { FirstTeamComponent as FootballAdults_FirstTeam_Component } from './pages/football-adults/first-team/first-team.component';
import { SecondTeamComponent as FootballAdults_SecondTeam_Component } from './pages/football-adults/second-team/second-team.component';
import { AhTeamComponent as FootballAdults_AhTeam_Component } from './pages/football-adults/ah-team/ah-team.component';

// Football youth pages
import { GeneralComponent as FootballYouth_General_Component } from './pages/football-youth/general/general.component';
import { CYouthComponent as FootballYouth_CYouth_Component } from './pages/football-youth/c-youth/c-youth.component';
import { EYouthComponent as FootballYouth_EYouth_Component } from './pages/football-youth/e-youth/e-youth.component';
import { FYouthComponent as FootballYouth_FYouth_Component } from './pages/football-youth/f-youth/f-youth.component';
import { GYouthComponent as FootballYouth_GYouth_Component } from './pages/football-youth/g-youth/g-youth.component';

// Other pages
import { ImprintComponent as Imprint_Component } from './pages/imprint/imprint.component';
import { PageNotFoundComponent as PageNotFound_Component } from './pages/page-not-found/page-not-found.component';
import { GymnasticsComponent as Gymnastics_Component } from './pages/gymnastics/gymnastics.component';
import { DancingComponent as Dancing_Component } from './pages/dancing/dancing.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home_Component },
  { path: 'über-uns', component: AboutUs_Managers_Component },
  { path: 'sportheim', component: AboutUs_SportsHome_Component },
  { path: 'chroniken', component: AboutUs_Chronicle_Component },
  { path: 'satzung', component: AboutUs_Statute_Component },
  { path: 'datenschutz', component: AboutUs_Privacy_Component },
  { path: 'mitgliedsantrag', component: AboutUs_Request_Component },
  { path: 'fussball/herren', component: FootballAdults_General_Component },
  { path: 'fussball/herren/erste-mannschaft', component: FootballAdults_FirstTeam_Component },
  { path: 'fussball/herren/zweite-mannschaft', component: FootballAdults_SecondTeam_Component },
  { path: 'fussball/herren/alte-herren', component: FootballAdults_AhTeam_Component },
  { path: 'fussball/jugend', component: FootballYouth_General_Component },
  { path: 'fussball/jugend/c-jugend', component: FootballYouth_CYouth_Component },
  { path: 'fussball/jugend/e-jugend', component: FootballYouth_EYouth_Component },
  { path: 'fussball/jugend/f-jugend', component: FootballYouth_FYouth_Component },
  { path: 'fussball/jugend/g-jugend', component: FootballYouth_GYouth_Component },
  { path: 'gymnastik', component: Gymnastics_Component },
  { path: 'tanzen', component: Dancing_Component },
  { path: 'impressum', component: Imprint_Component },
  { path: '**', component: PageNotFound_Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
