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
    'football-youth/g-youth': GYouthPage
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
    }))
];
