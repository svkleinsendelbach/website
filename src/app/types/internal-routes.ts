import { AhTeamPage } from '../pages/football-adults/ah-team/ah-team.page';
import { AllReportsPage } from '../pages/reports/all-reports/all-reports.page';
import { CYouthPage } from '../pages/football-youth/c-youth/c-youth.page';
import { ChroniclePage } from '../pages/about-us/chronicle/chronicle.page';
import { ContactPage } from '../pages/contact/contact.page';
import { DancingPage } from '../pages/dancing/dancing.page';
import { DrivePage } from '../pages/drive/drive.page';
import { EYouthPage } from '../pages/football-youth/e-youth/e-youth.page';
import { EditEventPage } from '../pages/editing/events/edit-event/edit-event.page';
import { EditOccupancyPage } from '../pages/editing/occupancy/edit-occupancy/edit-occupancy.page';
import { EditReportPage } from '../pages/editing/reports/edit-report/edit-report.page';
import { EditingEventsPage } from '../pages/editing/events/editing-events.page';
import { EditingMainPage } from '../pages/editing/main/editing-main.page';
import { EditingReportsPage } from '../pages/editing/reports/editing-reports.page';
import { FYouthPage } from '../pages/football-youth/f-youth/f-youth.page';
import { FirstTeamPage } from '../pages/football-adults/first-team/first-team.page';
import { FootballAdultsGeneralPage } from '../pages/football-adults/general/football-adults-general.page';
import { FootballYouthGeneralPage } from '../pages/football-youth/general/football-youth-general.page';
import { GYouthPage } from '../pages/football-youth/g-youth/g-youth.page';
import { GymnasticsPage } from '../pages/gymnastics/gymnastics.page';
import { HomePage } from '../pages/home/home.page';
import { ImprintPage } from '../pages/imprint/imprint.page';
import { InternalPath } from './internal-path';
import { LoginPage } from '../pages/editing/login/login.page';
import { ManagersPage } from '../pages/about-us/managers/managers.page';
import { OccupancyPage } from '../pages/editing/occupancy/occupancy.page';
import { PrivacyPage } from '../pages/about-us/privacy/privacy.page';
import { RequestPage } from '../pages/about-us/request/request.page';
import { Route } from '@angular/router';
import { SecondTeamPage } from '../pages/football-adults/second-team/second-team.page';
import { SportshomePage } from '../pages/about-us/sportshome/sportshome.page';
import { StatutePage } from '../pages/about-us/statute/statute.page';
import { Type } from '@angular/core';
import { UserRolesPage } from '../pages/editing/user-roles/user-roles.page';

const associatedRoute: Record<InternalPath, Type<unknown>> = {
    'anfahrt': DrivePage,
    'bearbeiten': EditingMainPage,
    'bearbeiten/anmelden': LoginPage,
    'bearbeiten/belegungsplan': OccupancyPage,
    'bearbeiten/belegungsplan/bearbeiten': EditOccupancyPage,
    'bearbeiten/benutzer-rollen': UserRolesPage,
    'bearbeiten/berichte': EditingReportsPage,
    'bearbeiten/berichte/bearbeiten': EditReportPage,
    'bearbeiten/termine': EditingEventsPage,
    'bearbeiten/termine/bearbeiten': EditEventPage,
    'berichte': AllReportsPage,
    'chroniken': ChroniclePage,
    'datenschutz': PrivacyPage,
    'fussball/herren': FootballAdultsGeneralPage,
    'fussball/herren/alte-herren': AhTeamPage,
    'fussball/herren/erste-mannschaft': FirstTeamPage,
    'fussball/herren/zweite-mannschaft': SecondTeamPage,
    'fussball/jugend': FootballYouthGeneralPage,
    'fussball/jugend/c-jugend': CYouthPage,
    'fussball/jugend/e-jugend': EYouthPage,
    'fussball/jugend/f-jugend': FYouthPage,
    'fussball/jugend/g-jugend': GYouthPage,
    'gymnastik': GymnasticsPage,
    'home': HomePage,
    'impressum': ImprintPage,
    'kontakt': ContactPage,
    'mitgliedsantrag': RequestPage,
    'satzung': StatutePage,
    'sportheim': SportshomePage,
    'tanzen': DancingPage,
    'über-uns': ManagersPage
};

export const internalRoutes: Route[] = ((): Route[] => {
    const routes: Route[] = [];
    for (const entry of Object.entries(associatedRoute)) {
        routes.push({
            component: entry[1],
            path: entry[0]
        });
    }
    return routes;
})();