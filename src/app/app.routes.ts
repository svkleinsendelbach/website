import { Type } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { InternalPathKey, internalPaths } from './types/internal-paths';
import { HomePage } from './pages/home/home.page';
import { ManagersPage } from './pages/about-us/managers/managers.page';
import { SportshomePage } from './pages/about-us/sportshome/sportshome.page';
import { ChroniclePage } from './pages/about-us/chronicle/chronicle.page';
import { StatutePage } from './pages/about-us/statute/statute.page';
import { SponsorsPage } from './pages/about-us/sponsors/sponsors.page';
import { entries } from 'kleinsendelbach-website-library';
import { PrivacyPage } from './pages/about-us/privacy/privacy.page';
import { RequestPage } from './pages/about-us/request/request.page';
import { FootballAdultsGeneralPage } from './pages/football-adults/general/general.page';
import { FirstTeamPage } from './pages/football-adults/first-team/first-team.page';
import { SecondTeamPage } from './pages/football-adults/second-team/second-team.page';
import { AhTeamPage } from './pages/football-adults/ah-team/ah-team.page';
import { FootballYouthGeneralPage } from './pages/football-youth/general/general.page';
import { AYouthPage } from './pages/football-youth/a-youth/a-youth.page';
import { BYouthPage } from './pages/football-youth/b-youth/b-youth.page';
import { CYouthPage } from './pages/football-youth/c-youth/c-youth.page';
import { DYouthPage } from './pages/football-youth/d-youth/d-youth.page';
import { EYouthPage } from './pages/football-youth/e-youth/e-youth.page';
import { FYouthPage } from './pages/football-youth/f-youth/f-youth.page';
import { GYouthPage } from './pages/football-youth/g-youth/g-youth.page';
import { GymnasticsPage } from './pages/gymnastics/gymnastics.page';
import { DancingPage } from './pages/dancing/dancing.page';
import { DrivePage } from './pages/drive/drive.page';
import { ContactPage } from './pages/contact/contact.page';
import { CriticsmPage } from './pages/criticsm/criticsm.page';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { ImpressumPage } from './pages/impressum/impressum.page';
import { LoginPage } from './pages/editing/login/login.page';
import { EditingMainPage } from './pages/editing/main/editing-main.page';
import { EditUserRolesPage } from './pages/editing/user-roles/edit-user-roles.page';
import { EditCriticismPage } from './pages/editing/criticism/edit-criticism.page';
import { OccupancyOverviewPage } from './pages/editing/occupancy/overview/occupancy-overview.page';
import { EditOccupancyPage } from './pages/editing/occupancy/edit/edit-occupancy.page';
import { EventsOverviewPage } from './pages/editing/events/overview/events-overview.page';
import { EditEventsPage } from './pages/editing/events/edit/edit-events.page';
import { ReportsOverviewPage } from './pages/editing/reports/overview/reports-overview.page';
import { EditReportsPage } from './pages/editing/reports/edit/edit-reports.page';
import { ReportsPage } from './pages/reports/reports.page';
import { NewsletterOverviewPage as EditingNewsletterOverviewPage } from './pages/editing/newsletter/overview/newsletter-overview.page';
import { PublishNewsletterPage } from './pages/editing/newsletter/publish/publish-newsletter.page';
import { EditNewsletterPage } from './pages/editing/newsletter/edit/edit-newsletter.page';
import { NewsletterOverviewPage } from './pages/newsletter/overview/newsletter-overview.page';
import { NewsletterPage } from './pages/newsletter/newsletter/newsletter.page';
import { SubscribeNewsletterPage } from './pages/newsletter/subscribe/subscribe-newsletter.page';
import { UnsubscribeNewsletterPage } from './pages/newsletter/unsubscribe/unsubscribe-newsletter.page';

const internalRoutes: Record<InternalPathKey, Type<unknown>> = {
    home: HomePage,
    managers: ManagersPage,
    sportshome: SportshomePage,
    chronicle: ChroniclePage,
    statute: StatutePage,
    sponsors: SponsorsPage,
    privacy: PrivacyPage,
    request: RequestPage,
    'football-adults': FootballAdultsGeneralPage,
    'football-adults/first-team': FirstTeamPage,
    'football-adults/second-team': SecondTeamPage,
    'football-adults/ah-team': AhTeamPage,
    'football-youth': FootballYouthGeneralPage,
    'football-youth/a-youth': AYouthPage,
    'football-youth/b-youth': BYouthPage,
    'football-youth/c-youth': CYouthPage,
    'football-youth/d-youth': DYouthPage,
    'football-youth/e-youth': EYouthPage,
    'football-youth/f-youth': FYouthPage,
    'football-youth/g-youth': GYouthPage,
    gymnastics: GymnasticsPage,
    dancing: DancingPage,
    drive: DrivePage,
    contact: ContactPage,
    criticism: CriticsmPage,
    impressum: ImpressumPage,
    reports: ReportsPage,
    newsletter: NewsletterOverviewPage,
    'newsletter/subscribe': SubscribeNewsletterPage,
    'newsletter/unsubscribe': UnsubscribeNewsletterPage,
    'newsletter/unsubscribe/:id': UnsubscribeNewsletterPage,
    'newsletter/:id': NewsletterPage,
    'editing/login': LoginPage,
    'editing/main': EditingMainPage,
    'editing/user-roles/edit': EditUserRolesPage,
    'editing/criticism/edit': EditCriticismPage,
    'editing/occupancy': OccupancyOverviewPage,
    'editing/occupancy/edit': EditOccupancyPage,
    'editing/events': EventsOverviewPage,
    'editing/events/edit': EditEventsPage,
    'editing/reports': ReportsOverviewPage,
    'editing/reports/edit': EditReportsPage,
    'editing/newsletter': EditingNewsletterOverviewPage,
    'editing/newsletter/publish': PublishNewsletterPage,
    'editing/newsletter/edit': EditNewsletterPage
}

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    ...entries(internalRoutes).map<Route>(({ key, value }) => ({
        path: internalPaths[key].path,
        component: value
    })),
    {
        path: '**',
        component: PageNotFoundPage
    }
];
