import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from './environment/environment';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            }),
            AngularFireModule.initializeApp(environment.firebase)
        )
    ]
};
