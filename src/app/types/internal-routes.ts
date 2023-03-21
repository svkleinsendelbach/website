import { Route } from '@angular/router';
import { InternalPath } from './internal-path';
import { Type } from '@angular/core';

import { HomePage } from '../pages/home/home.page';
import { ManagersPage } from '../pages/about-us/managers/managers.page';
import { SportshomePage } from '../pages/about-us/sportshome/sportshome.page';
import { ChroniclePage } from '../pages/about-us/chronicle/chronicle.page';
import { StatutePage } from '../pages/about-us/statute/statute.page';
import { PrivacyPage } from '../pages/about-us/privacy/privacy.page';
import { RequestPage } from '../pages/about-us/request/request.page';
import { FootballAdultsGeneralPage } from '../pages/football-adults/general/football-adults-general.page';
import { FirstTeamPage } from '../pages/football-adults/first-team/first-team.page';
import { SecondTeamPage } from '../pages/football-adults/second-team/second-team.page';
import { AhTeamPage } from '../pages/football-adults/ah-team/ah-team.page';
import { FootballYouthGeneralPage } from '../pages/football-youth/general/football-youth-general.page';
import { CYouthPage } from '../pages/football-youth/c-youth/c-youth.page';
import { EYouthPage } from '../pages/football-youth/e-youth/e-youth.page';
import { FYouthPage } from '../pages/football-youth/f-youth/f-youth.page';
import { GYouthPage } from '../pages/football-youth/g-youth/g-youth.page';
import { GymnasticsPage } from '../pages/gymnastics/gymnastics.page';
import { DancingPage } from '../pages/dancing/dancing.page';
import { DrivePage } from '../pages/drive/drive.page';
import { ContactPage } from '../pages/contact/contact.page';
import { ImprintPage } from '../pages/imprint/imprint.page';
import { AllNewsPage } from '../pages/news/all-news/all-news.page';
import { EditingMainPage } from '../pages/editing/main/editing-main.page';
import { LoginPage } from '../pages/editing/login/login.page';
import { EditingEventsPage } from '../pages/editing/events/editing-events.page';
import { EditEventPage } from '../pages/editing/events/edit-event/edit-event.page';
import { EditingNewsPage } from '../pages/editing/news/editing-news.page';
import { EditNewsPage } from '../pages/editing/news/edit-news/edit-news.page';
import { EditingReportsPage } from '../pages/editing/reports/editing-reports.page';
import { EditReportPage } from '../pages/editing/reports/edit-report/edit-report.page';

const associatedRoute: Record<Exclude<InternalPath, 'nachricht' | 'spiel'>, Type<unknown>> = {
    'home': HomePage,
    'über-uns': ManagersPage,
    'sportheim': SportshomePage,
    'chroniken': ChroniclePage,
    'satzung': StatutePage,
    'datenschutz': PrivacyPage,
    'mitgliedsantrag': RequestPage,
    'fussball/herren': FootballAdultsGeneralPage,
    'fussball/herren/erste-mannschaft': FirstTeamPage,
    'fussball/herren/zweite-mannschaft': SecondTeamPage,
    'fussball/herren/alte-herren': AhTeamPage,
    'fussball/jugend': FootballYouthGeneralPage,
    'fussball/jugend/c-jugend': CYouthPage,
    'fussball/jugend/e-jugend': EYouthPage,
    'fussball/jugend/f-jugend': FYouthPage,
    'fussball/jugend/g-jugend': GYouthPage,
    'gymnastik': GymnasticsPage,
    'tanzen': DancingPage,
    'anfahrt': DrivePage,
    'kontakt': ContactPage,
    'impressum': ImprintPage,
    'nachrichten': AllNewsPage,
    'bearbeiten': EditingMainPage,
    'bearbeiten/anmelden': LoginPage,
    'bearbeiten/termine': EditingEventsPage,
    'bearbeiten/termine/bearbeiten': EditEventPage,
    'bearbeiten/nachrichten': EditingNewsPage,
    'bearbeiten/nachrichten/bearbeiten': EditNewsPage,
    'bearbeiten/berichte': EditingReportsPage,
    'bearbeiten/berichte/bearbeiten': EditReportPage
};

export const internalRoutes: Route[] = (() => {
    const routes: Route[] = [];
    for (const entry of Object.entries(associatedRoute))
        routes.push({ path: entry[0], component: entry[1] });
    return routes;
})();
