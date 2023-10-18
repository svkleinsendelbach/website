import { RouterModule, Routes } from '@angular/router';
import { NgModule, Type } from '@angular/core';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { InternalLinkPath } from './types/internal-link-path';

import { AhTeamPage } from './pages/football-adults/ah-team/ah-team.page';
import { AllReportsPage } from './pages/reports/all-reports/all-reports.page';
import { CYouthPage } from './pages/football-youth/c-youth/c-youth.page';
import { ChroniclePage } from './pages/about-us/chronicle/chronicle.page';
import { ContactPage } from './pages/contact/contact.page';
import { CriticismSuggestionPage } from './pages/criticism-suggestion/criticism-suggestion.page';
import { DancingPage } from './pages/dancing/dancing.page';
import { DrivePage } from './pages/drive/drive.page';
import { EYouthPage } from './pages/football-youth/e-youth/e-youth.page';
import { EditEventPage } from './pages/editing/events/edit-event/edit-event.page';
import { EditOccupancyPage } from './pages/editing/occupancy/edit-occupancy/edit-occupancy.page';
import { EditReportPage } from './pages/editing/reports/edit-report/edit-report.page';
import { EditingCriticismSuggestionPage } from './pages/editing/criticism-suggestion/editing-criticism-suggestion.page';
import { EditingEventsPage } from './pages/editing/events/editing-events.page';
import { EditingMainPage } from './pages/editing/main/editing-main.page';
import { EditingOccupancyPage } from './pages/editing/occupancy/editing-occupancy.page';
import { EditingReportsPage } from './pages/editing/reports/editing-reports.page';
import { EditingUserRolesPage } from './pages/editing/user-roles/editing-user-roles.page';
import { FYouthPage } from './pages/football-youth/f-youth/f-youth.page';
import { FirstTeamPage } from './pages/football-adults/first-team/first-team.page';
import { FootballAdultsGeneralPage } from './pages/football-adults/general/football-adults-general.page';
import { FootballYouthGeneralPage } from './pages/football-youth/general/football-youth-general.page';
import { GYouthPage } from './pages/football-youth/g-youth/g-youth.page';
import { GymnasticsPage } from './pages/gymnastics/gymnastics.page';
import { HomePage } from './pages/home/home.page';
import { ImprintPage } from './pages/imprint/imprint.page';
import { LoginPage } from './pages/editing/login/login.page';
import { ManagersPage } from './pages/about-us/managers/managers.page';
import { PrivacyPage } from './pages/about-us/privacy/privacy.page';
import { RequestPage } from './pages/about-us/request/request.page';
import { SecondTeamPage } from './pages/football-adults/second-team/second-team.page';
import { SportshomePage } from './pages/about-us/sportshome/sportshome.page';
import { StatutePage } from './pages/about-us/statute/statute.page';
import { SponsorsPage } from './pages/about-us/sponsors/sponsors.page';

export const internalRoutes: Record<InternalLinkPath, Type<unknown>> = {
    'anfahrt': DrivePage,
    'bearbeiten': EditingMainPage,
    'bearbeiten/anmelden': LoginPage,
    'bearbeiten/belegungsplan': EditingOccupancyPage,
    'bearbeiten/belegungsplan/bearbeiten': EditOccupancyPage,
    'bearbeiten/benutzer-rollen': EditingUserRolesPage,
    'bearbeiten/berichte': EditingReportsPage,
    'bearbeiten/berichte/bearbeiten': EditReportPage,
    'bearbeiten/kritik-vorschläge': EditingCriticismSuggestionPage,
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
    'kritik-vorschläge': CriticismSuggestionPage,
    'mitgliedsantrag': RequestPage,
    'satzung': StatutePage,
    'sponsoren': SponsorsPage,
    'sportheim': SportshomePage,
    'tanzen': DancingPage,
    'über-uns': ManagersPage
};

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    ...Object.entries(internalRoutes).map(entry => ({
        path: entry[0],
        component: entry[1]
    })),
    {
        path: '**',
        component: PageNotFoundPage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
