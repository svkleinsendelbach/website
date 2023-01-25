import { Route } from '@angular/router';
import { InternalPath } from './InternalPath';
import { Type } from '@angular/core';

import { HomeComponent } from '../pages/home/home.component';
import { ChronicleComponent } from '../pages/about-us/chronicle/chronicle.component';
import { ManagersComponent } from '../pages/about-us/managers/managers.component';
import { GeneralComponent as FootballAdultsGeneralComponent } from '../pages/football-adults/general/general.component';
import { FirstTeamComponent } from '../pages/football-adults/first-team/first-team.component';
import { SecondTeamComponent } from '../pages/football-adults/second-team/second-team.component';
import { AhTeamComponent } from '../pages/football-adults/ah-team/ah-team.component';
import { GeneralComponent as FootballYouthGeneralComponent } from '../pages/football-youth/general/general.component';
import { PrivacyComponent } from '../pages/about-us/privacy/privacy.component';
import { RequestComponent } from '../pages/about-us/request/request.component';
import { SportshomeComponent } from '../pages/about-us/sportshome/sportshome.component';
import { StatuteComponent } from '../pages/about-us/statute/statute.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { DancingComponent } from '../pages/dancing/dancing.component';
import { DriveComponent } from '../pages/drive/drive.component';
import { EditEventComponent } from '../pages/editing/events/edit-event/edit-event.component';
import { EventsComponent } from '../pages/editing/events/events.component';
import { LoginComponent } from '../pages/editing/login/login.component';
import { MainComponent } from '../pages/editing/main/main.component';
import { EditNewsComponent } from '../pages/editing/news/edit-news/edit-news.component';
import { NewsComponent } from '../pages/editing/news/news.component';
import { CYouthComponent } from '../pages/football-youth/c-youth/c-youth.component';
import { EYouthComponent } from '../pages/football-youth/e-youth/e-youth.component';
import { FYouthComponent } from '../pages/football-youth/f-youth/f-youth.component';
import { GYouthComponent } from '../pages/football-youth/g-youth/g-youth.component';
import { GymnasticsComponent } from '../pages/gymnastics/gymnastics.component';
import { ImprintComponent } from '../pages/imprint/imprint.component';

const associatedRoute: Record<InternalPath, Type<unknown>> = {
  'home': HomeComponent,
  'über-uns': ManagersComponent,
  'sportheim': SportshomeComponent,
  'chroniken': ChronicleComponent,
  'satzung': StatuteComponent,
  'datenschutz': PrivacyComponent,
  'mitgliedsantrag': RequestComponent,
  'impressum': ImprintComponent,
  'fussball/herren': FootballAdultsGeneralComponent,
  'fussball/herren/erste-mannschaft': FirstTeamComponent,
  'fussball/herren/zweite-mannschaft': SecondTeamComponent,
  'fussball/herren/alte-herren': AhTeamComponent,
  'fussball/jugend': FootballYouthGeneralComponent,
  'fussball/jugend/c-jugend': CYouthComponent,
  'fussball/jugend/e-jugend': EYouthComponent,
  'fussball/jugend/f-jugend': FYouthComponent,
  'fussball/jugend/g-jugend': GYouthComponent,
  'gymnastik': GymnasticsComponent,
  'tanzen': DancingComponent,
  'anfahrt': DriveComponent,
  'kontakt': ContactComponent,
  'bearbeiten': MainComponent,
  'bearbeiten/anmelden': LoginComponent,
  'bearbeiten/termine': EventsComponent,
  'bearbeiten/termine/bearbeiten': EditEventComponent,
  'bearbeiten/nachrichten': NewsComponent,
  'bearbeiten/nachrichten/bearbeiten': EditNewsComponent
};

export const internalRoutes: Route[] = (() => {
  const routes: Route[] = [];
  for (const entry of Object.entries(associatedRoute))
    routes.push({ path: entry[0], component: entry[1] });
  return routes;
})();
