import { Type } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { InternalPath } from './types/internal-path';
import { HomePage } from './pages/home/home.page';
import { entries } from 'kleinsendelbach-website-library';

const internalRoutes: Record<InternalPath, Type<unknown>> = {
    home: HomePage
}

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    ...entries(internalRoutes).map<Route>(({ key, value }) => ({
        path: key,
        component: value
    }))
];
